//https://api.nasa.gov/planetary/apod?api_key=hLIBzAg75PshqSDBEy2EBsFBdxm3GAA2iUTcNozJ


// apod is an object, init is a function
var apod = {

  randomDate: function(start, end) {
    // randomize date
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    // format date
    let d = date.getDate();
    // months are still 0 index; add 1 to get regular month int
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    // format month to 2 digits
    if (m < 10) {
      // add 0 as string if <10
      m = '0' + m;
    }

    // format date to 2 digits
    if (d < 10) {
      d = '0' + d
    }

    return `${y}-${m}-${d}`
  },

  
  buildDOM: function(result) {
    $('#apodTitle').text(result.title);

    if (result.media_type === 'video') {
      // hide apodImg and show apodVideo in an iframe
      $('#apodImg').hide();
      $('#apodVideo > iframe').attr('src', result.url).show();
    } else {
      // hide apodVideo and show apodImg
      $('#apodVideo').hide();
      $('#apodImg').attr('src', result.url).attr('alt', result.title);
    }

    $('#apodCopyright').text('Copyright: ' + result.copyright);
    $('#apodDate').text('Date: ' + result.date);
    $('#apodDesc').text(result.explanation);
  },

    getRequest: function() {
      let _this = this;
      let date = this.randomDate(new Date(1995, 5, 16), new Date());
      let url = 'https://api.nasa.gov/planetary/apod?api_key=hLIBzAg75PshqSDBEy2EBsFBdxm3GAA2iUTcNozJ&date=' + date;
      $.ajax({
      // call url, console.log results
      url: url
    }).done(function(result) {
      console.log(result);
      _this.buildDOM(result);
    }).fail(function(result) {
      console.log(result);
    });
  },
  
  init: function() {
    this.getRequest();
  }
}
// call apod function init
apod.init();

$(function() {
  $('#btnRandApod').on('click', function() {
    apod.getRequest();
  });
});