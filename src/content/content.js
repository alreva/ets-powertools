
function log(message) {
  console.log("ETS Power Tools: " + message);
}

function log(message, arg) {
  console.log("ETS Power Tools: " + message, arg);
}

$(document).ready(function() {
  // Perform DOM manipulation here
  log('content script loaded');

  var indexes = getColumnIndexes();

  var rows = getDateRows(indexes);
  var grouped = groupByDate(rows, indexes);

  log('grouped by date: ', grouped);

  markRowsWithProperStatus(grouped, indexes);

});

function getColumnIndexes() {
  var indexes = {};
  $('.TableRowHeader td').each(function(index) {
    var text = $(this).text().trim();
    indexes[text] = index;
  });
  log('indexes: ', indexes);
  return indexes;
}

function getDateRows() {
  var rows = [];
  $('.TableRowClosed, .TableRowContent').each(function() {
    var aTag = $(this).find('td a[title="Set filter by date"]');
    if (aTag.length > 0) {
      rows.push($(this));
    }
  });
  return rows;
}

// a function that groups the rows by date, where the date is within TD in an a tag with title equal to 'Set filter by date'
function groupByDate(rows, indexes) {
  var grouped = {};
  rows.forEach(function(row) {
    var dateStr = row.find('td a[title="Set filter by date"]').text().trim();
    log('dateStr: ', dateStr)
    var date = parseDate(dateStr);
    var rawData = getRawData(row, indexes);
    var data = parseRawData(rawData);

    if (grouped[date]) {
      grouped[date].push({ data, rawData, row });
    } else {
      grouped[date] = [{ data, rawData, row }];
    }
    grouped[date].totals = calculateTotals(grouped[date]);
    grouped[date].allClosed = grouped[date].every(function(item) {
      return item.rawData.classNames.includes('TableRowClosed');
    });
  });
  return grouped;
}

// parse data from row using indices
function getRawData(row, indexes) {
  var data = {};
  for (var key in indexes) {
    var index = indexes[key];
    var value = row.find('td').eq(index).text().trim();
    data[key] = value;
    data.classNames = row.attr('class').split(' ');
  }
  return data;
}

// parse raw data to get the data in the format we want
function parseRawData(rawData) {
  var data = {};
  for (var key in rawData) {
    var value = rawData[key];
    data[key] = value;
    if (key === 'Start Date' || key === 'Completion Date') {
      data[key] = parseDate(value);
    }
    if (key === 'Description') {
      if (value.indexOf('\n') > -1) {
        data[key] = value.split('\n')[0];
      } else {
        data[key] = value;
      }
    }
    if (key === 'STD' || key === 'OVR') {
      data[key] = parseFloat(value);
    }
  }

  return data;
}

// calculate totals for the group
function calculateTotals(group) {
  var totals = {
    STD: 0,
    OVR: 0
  };
  group.forEach(function(item) {
    totals.STD += item.data.STD || 0;
    totals.OVR += item.data.OVR || 0;
    totals.STD_AND_OVR = totals.STD + totals.OVR;
  });
  return totals;
}

// set class name for the table rows where total STD for the day is 8 or greater
function markRowsWithProperStatus(grouped, indexes) {
  for (var date in grouped) {
    var group = grouped[date];
    var firstRow = group[0].row;
    firstRow.addClass('TableRowDateHeader');

    if (group.totals.STD >= 8 && !group.allClosed) {
      group.forEach(function(item) {
        item.row.addClass('TableRowComplete');
      });
    }

    setTotalHours(group, indexes);
  }
}


// parse date function for dates like 01.07.2024 Mon
function parseDate(dateString) {
  var parts1 = dateString.split(' ');

  var dayOfWeek = parts1[1];
  var dateStr = parts1[0];

  var parts = dateStr.split('.');
  var day = parts[0];
  var month = parts[1];
  var year = parts[2];

  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

function setTotalHours(group, indexes) {
  if (group.totals.STD < 8 && group.totals.STD > 0) {
    var firstRow = group[0].row;
    var statusTd = firstRow.find('td').eq(indexes.Status);
    statusTd.text(group.totals.STD + " / 8");
    statusTd.addClass('TableRowStatusHours');
  }
}