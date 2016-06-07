;(function() {

  function Recirc() {

    try {
      var r = new XMLHttpRequest();
      r.open("get", "https://fivethirtyeight.com/tag/" + (trackingConfig.primaryTag || "2016-election") + "/feed/", true);
      r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;

        if (window.DOMParser) {
          parser=new DOMParser();
          xmlDoc=parser.parseFromString(r.responseText,"text/xml");
        } else {
          xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async=false;
          xmlDoc.loadXML(r.responseText);
        }

        var added = 0;
        for (var i = 0; i < xmlDoc.getElementsByTagName("item").length; i++) {
          added += addItem(xmlDoc.getElementsByTagName("item")[i], added);
          if (added >= 5) {
            document.getElementById("related").style.display = "block";
            break;
          }
        }
      };
      r.send();
    } catch(err) {

    }

    function addItem(item, i) {
      if (item.getElementsByTagNameNS("*", "thumbnail").length == 0) {
        return 0;
      }
      var url = item.getElementsByTagName("link")[0].textContent,
          title = item.getElementsByTagName("title")[0].textContent,
          imgSrc = item.getElementsByTagNameNS("*", "thumbnail")[0].getAttribute('url').replace("?w=150", "?w=256");
      if (url.indexOf('projects.fivethirtyeight.com') >= 0 && url.indexOf(trackingConfig.fullUrl.split('/').slice(-2)[0]) >= 0) {
        return 0;
      }

      var el = document.getElementById("related-" + (i+1).toString()),
          a = document.createElement('a'),
          img = new Image(),
          h2 = document.createElement('h2'),
          a2 = document.createElement('a');

      a.href = url;
      img.src = imgSrc;
      img.alt = title;
      a.appendChild(img);

      a2.href = url;
      a2.innerHTML = title;
      h2.appendChild(a2);

      el.innerHTML = '';
      el.appendChild(a);
      el.appendChild(h2);
      return 1;
    }
  }

  module.exports = new Recirc();

}());
