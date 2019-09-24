function lddSocialHousing(L, map, doc, pointer, tabs, file, tableTypes, id, title){
    var self = this;
    self.L = L;
    self.map = map;
    self.doc = doc;
    self.tabs = tabs;
    self.id = id;
    self.loadState = "Loading.";
    setupCats();
    self.title = title;
    self.tableTypes = tableTypes;
    self.ready = false;
    self.active = true;
    self.visible = true;
    self.pointer = pointer;
    self.mark = [];
    self.file = file;
    self.st = {lat:51.5073219, lon:-0.1276474, zoom:11};
    setupCtls();
    setupCats();

    function setupCtls(){
        var statCtl = { label:"Status", className: "dropdown", idName: "statusDropdown" };
        var statItems = [   {val:"1", itemName:"All applications"},
                            {val:"2", itemName:"In process"},
                            {val:"3", itemName:"Completed"}         ];
        var borCtl = { label:"Borough", className: "dropdown", idName: "borDropdown" };
		var borZoom = 12;
        self.borItems = [
                             {val:"All Boroughs", itemName:"All Boroughs", lat:51.5073219, lon:-0.1276474, zoom:11},
                             {val:"Barking and Dagenham", itemName:"Barking and Dagenham", lat:51.5544867, lon:0.1498537, zoom:borZoom},
                             {val:"Barnet", itemName:"Barnet", lat:51.6135636, lon:-0.2112689, zoom:borZoom},
                             {val:"Bexley", itemName:"Bexley", lat:51.4625359, lon:0.1424610, zoom:borZoom},
                             {val:"Brent", itemName:"Brent", lat:51.5637061, lon:-0.2768436, zoom:borZoom},
                             {val:"Bromley", itemName:"Bromley", lat:51.3674577, lon:0.0604315, zoom:borZoom},
                             {val:"Camden", itemName:"Camden", lat:51.5431852, lon:-0.1634566, zoom:borZoom},
                             {val:"Croydon", itemName:"Croydon", lat:51.3557039, lon:-0.0625286, zoom:borZoom},
                             {val:"Ealing", itemName:"Ealing",  lat:51.5252635, lon:-0.3140294, zoom:borZoom},
                             {val:"Enfield", itemName:"Enfield", lat:51.6484796, lon:-0.0815612, zoom:borZoom},
                             {val:"Greenwich", itemName:"Greenwich", lat:51.4677524, lon:0.0472697, zoom:borZoom},
                             {val:"Hackney", itemName:"Hackney", lat:51.5493291, lon:-0.0480898, zoom:borZoom},
                             {val:"Hammersmith and Fulham", itemName:"Hammersmith and Fulham", lat:51.4981468, lon:-0.2284865, zoom:borZoom},
                             {val:"Haringey", itemName:"Haringey", lat:51.5877242, lon:-0.1054813, zoom:borZoom},
                             {val:"Harrow", itemName:"Harrow", lat: 51.5979317, lon:-0.3370282, zoom:borZoom},
                             {val:"Havering", itemName:"Havering", lat:51.5583163, lon:0.2491486, zoom:borZoom},
                             {val:"Hillingdon", itemName:"Hillingdon", lat:51.5430928, lon:-0.4485393, zoom:borZoom},
                             {val:"Hounslow", itemName:"Hounslow", lat:51.4620518, lon:-0.3802763, zoom:borZoom},
                             {val:"Islington", itemName:"Islington", lat:51.5475893, lon:-0.0995679, zoom:borZoom},
                             {val:"Kensington and Chelsea", itemName:"Kensington and Chelsea", lat:51.5041000, lon:-0.2008312, zoom:borZoom},
                             {val:"Kingston upon Thames", itemName:"Kingston upon Thames", lat:51.3817485, lon:-0.2762724, zoom:borZoom},
                             {val:"Lambeth", itemName:"Lambeth", lat:51.4601959, lon:-0.1224009, zoom:borZoom},
                             {val:"Lewisham", itemName:"Lewisham", lat:51.4524393, lon:-0.0152435, zoom:borZoom},
                             {val:"Merton", itemName:"Merton", lat:51.4120432, lon:-0.1856680, zoom:borZoom},
                             {val:"Newham", itemName:"Newham", lat:51.5296578, lon:0.0308328, zoom:borZoom},
                             {val:"Redbridge", itemName:"Redbridge", lat:51.5870039, lon:0.0692017, zoom:borZoom},
                             {val:"Richmond upon Thames", itemName:"Richmond upon Thames", lat:51.4413272, lon:-0.3078970, zoom:borZoom},
                             {val:"Southwark", itemName:"Southwark", lat:51.4658988, lon:-0.0691303, zoom:borZoom},
                             {val:"Sutton", itemName:"Sutton", lat:51.3571256, lon:-0.1735669, zoom:borZoom},
                             {val:"Tower Hamlets", itemName:"Tower Hamlets", lat:51.5147531, lon:-0.0351481, zoom:borZoom},
                             {val:"Waltham Forest", itemName:"Waltham Forest", lat:51.5983970, lon:-0.0171161, zoom:borZoom},
                             {val:"Wandsworth", itemName:"Wandsworth", lat:51.4526576, lon:-0.2000280, zoom:borZoom},
                             {val:"Westminster", itemName:"Westminster", lat:51.5150880, lon:-0.1593473, zoom:borZoom}
                        ];
        self.ctls = [ {id:"shDataHeader", html:"<p><div id='shDataHeader'><strong>Data: " + self.title + "</strong></div></p>", type:"head"},
                      {id:"shSrcHeader", html:"<p><div id='shSrcHeader'><strong>Source: London Development Database, GLA</strong></div><div class='system' id='systemMsg'></div></p>", type:"head"},
                      {id:"shFilter", html:"<div id='shFilter'><h3>Filter</h3></div>", type:"head"},
                      {id:"shLoad", html:"<div id='shLoad'></div>", type:"info"},
                      {id:statCtl.idName, html:"<p>" + buildHTMLdropdown(statCtl, statItems) + "</p>", value:1, refresh: function(){self.refreshMarks();}, type:"control"},
                      {id:borCtl.idName, html:"<p>" + buildHTMLdropdown(borCtl, self.borItems) + "</p>", value:"All Boroughs", refresh: function(){self.refreshMarks(); self.centreOnGeoUnit()}, type:"control"},
                      {id:"datFrom", html:"<p><strong>From:</strong> <input type='date' id='datFrom' value='2006-01-01' min='2006-01-01' max='2020-12-31'>", value:"2006-01-01", refresh: function(){self.refreshMarks();}, type:"control"},
                      {id:"datTo", html:" <strong>To:</strong> <input type='date' id='datTo' value='2019-12-31' min='2006-01-01' max='2019-12-31'></p>", value:"2019-12-31", refresh: function(){self.refreshMarks();}, type:"control"}];
        if (self.tableTypes == "housing" || self.tableTypes == "all"){
            console.log("Adding housing controls");
            var ctlHousing = [
                          {id:"shiSlider", 
                            html:"<p><div id='shiOutput'><strong>Minimum Social Housing Impact:</strong> 0</div>" +
                                "<input type='range' min='0' max='150' value='0' class='slider' id='shiSlider'></p>",
                            value:0,
                            refresh: function(){
                                                 self.refreshMarks(); 
                                                 self.doc.getElementById("shiOutput").innerHTML = "<strong>Minimum Social Housing Impact:</strong> " + 
                                                                                                  self.doc.getElementById("shiSlider").value;
                                               },
                            type:"control" },
                          {id:"shDetails", html:"<div id='shDetails'><h3>Details of the Application</h3></div>", type:"info"},
                          {id:"housingDetails", html:"<div id='housingDetails'></div>", type:"info"}      ];
            self.ctls = self.ctls.concat(ctlHousing);   
        }else{
            console.log("Not adding controls");
        }
        for (var i=0; i<self.ctls.length; i++){
            console.log(self.ctls[i].id);
        } 
        self.ctlRef = {};
    }

    function setupCats(){
          if (self.tableTypes == "housing" || self.tableTypes == "all"){
              self.resCat = {
                  "S":"Social",
                  "LA":"London affordable rent",
                  "LLR":"London living rent",
                  "A":"Affordable",
                  "DMR":"Discount market rent",
                  "I":"Intermediate",
                  "M":"Market",
                  "PRS":"Build to rent",
                  "SH":"Starter home",
                  null:"Unclassified"
              };
              self.spaceCat = {
                  "AL":"Allotments, community gardens and city farms",
                  "AM":"Amenity",
                  "BR":"Brownfield Land",
                  "CM":"Cemeteries, churchyards and other burial grounds",
                  "CS":"Civic spaces",
                  "CY":"Provision for children and young people",
                  "GC":"Green Corridors",
                  "NRG":"Non-residential institution grounds or garden",
                  "NS":"Natural and semi-natural",
                  "OS":"Outdoor sports facilities incl school playing fields",
                  "PG":"Parks and Gardens",
                  "RG":"Residential Garden",
                  "UF":"Countryside in urban fringe areas",
                  null:"Unclassified"
              };
          }
      }    

      self.centreOnGeoUnit = function(){
          var val = self.ctlRef.borDropdown.options[self.ctlRef.borDropdown.selectedIndex].value;
          var lat = self.st.lat;
          var lon = self.st.lon;
          var z = self.st.zoom;
          for (var i=0; i<self.borItems.length; i++){
              if (self.borItems[i].val == val){
                  lat = self.borItems[i].lat;
                  lon = self.borItems[i].lon;
                  z = self.borItems[i].zoom;
              }
          }
          self.map.setView([lat,lon],z);
      }

      self.setVisible = function(bol){
          self.visible = bol;
          if(bol){
              self.refreshMarks();
          }else{
              self.removeMarks();
          }
      }

      self.getData = function(){
          var xmlhttp = new XMLHttpRequest();
          xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                  self.doc.getElementById("systemMsg").innerHTML = "";
                  initMarkers(this.responseText);
              }else if (this.readyState == 3){
                  self.doc.getElementById("systemMsg").innerHTML = " Loading data...";
              }else if (this.readyState == 2){
                  self.doc.getElementById("systemMsg").innerHTML = " Loading data..";
              }else if (this.readyState == 1){
                  self.doc.getElementById("systemMsg").innerHTML = " Loading data.";
              }
          };
          xmlhttp.open("POST", self.file, true);
          xmlhttp.send();
      }
      
      self.outputControls = function(){
          var rtn = "";
          for(var i=0; i<self.ctls.length; i++){
              rtn +=  self.ctls[i].html;
          }
          return rtn;
      }

      // Once we have outputted the controls, we need to be able to read them. Is there a better way? Almost certainly yes.
      self.initControls = function(doc){
          for (var i=0; i<self.ctls.length; i++){
              self.ctls[i].ctl = doc.getElementById(self.ctls[i].id);
              self.ctls[i].ctl.value = self.ctls[i].value;
              self.ctlRef[self.ctls[i].id] = self.ctls[i].ctl;
              console.log(self.ctls[i].id + " added");
              if (self.ctls[i].type="control"){
                  self.ctls[i].ctl.oninput = self.ctls[i].refresh;
              }
          } 
          self.doc.getElementById("shiOutput").innerHTML = "<strong>Minimum Social Housing Impact:</strong> " + self.doc.getElementById("shiSlider").value;
      }

      function buildHTMLdropdown(ctl, arr){
          rtn = "\t<strong>" + ctl.label + ": </strong>\n";
          rtn += "\t<select class='" + ctl.className + "' name='" + ctl.idName + "' id = '" + ctl.idName + "'>";
          for(var i=0; i<arr.length; i++){
              rtn += "\t\t<option value='" + arr[i].val + "'>" + arr[i].itemName + "</option>\n";
          }        
          rtn += "</select>";
          return rtn;
      }

      function initMarkers(rawdata){
          self.data = JSON.parse(rawdata);
          self.ready = true;
          self.loadMarks();
      }
      
      self.loadMarks = function(){
          console.log("adding map marks");
          crit = self.getCriteria();
          for(var i=0; i<self.data.speciesoccurrence..length; i++){
              var spec = self.data.speciesoccurrence[i];
              if(checkIfIncluded(spec, crit)){
                  var specMark;
                  specMark = self.renderSpecMarkAsCircle(spec,crit);
                  specMark.addTo(self.map);
                  self.mark.push(specMark);
              }
          }
      }

      self.renderSpecMarkAsCircle = function(app, crit){
          appr = self.setMapMarkAppearance(app, crit);
          var specMark = L.circle([app.lat, app.lon], {
              color: appr.lc,
              fillColor: appr.fc,
              fillOpacity: appr.op,
              radius: appr.rd,
              planapp: app
          });
          specMark.on("click", function(e){
              self.displayDetails(e.target.options.planapp);
          });
          return appMark;
      }

      self.renderAppMarkAsPoly = function(app, crit){
          console.log("Adding poly of site");
          appr = self.setMapMarkAppearance(app, crit);
          var poly = app.geoPoly.point;
          var ll = [];
          for (var i=0; i< poly.length; i++){
              ll.push([poly[i].lat, poly[i].lon]);
          }
          var appMark = L.polygon(ll, {
              color: appr.lc,
            fillColor: appr.fc,
            fillOpacity: appr.op,
            planapp: app
        }); 
        appMark.on("click", function(e){
            self.displayDetails(e.target.options.planapp);
        });
        return appMark;
    }

    self.refreshMarks = function(){
        for (var i=0; i<self.ctls.length; i++){
            if(self.ctls[i].type="control"){
                console.log(self.ctls[i].id + ":" + self.ctls[i].ctl.value);
                self.ctls[i].value = self.ctls[i].ctl.value;
            }
//            self.ctls[i].value  
        }
        if(self.ready && self.visible){
          self.removeMarks();
          self.loadMarks();
        }
    }

    self.removeMarks = function(){
      console.log("removing map marks");
      for(var i=0; i<self.mark.length; i++){
          if (self.mark[i]) { // check
              self.map.removeLayer(self.mark[i]); // remove
          }
      }
      self.mark = [];
    }

    self.setMapMarkAppearance = function (pt, crit){
        var lineColor = 'yellow';
        var fillColor = 'yellow';
        var opac = 0.3;
        var rad = 12; 
        if(checkIfIncluded(pt, crit)){
        }
        mma = {lc:lineColor, fc: fillColor, op: opac, rd: rad};
        return mma;
    }

    function checkIfIncluded(pt,crit){
        var rtn = true;
/*        var year = parseInt(pt.permission_date.substring(0,4),10)
        if (crit.dtlow > pt.permission_date || crit.dthigh < pt.permission_date){
            rtn = false;
        } else if  (crit.borough != "All Boroughs" && crit.borough != pt.borough_name){
            rtn = false;
        }else if ((crit.stat == "3" && pt.status_rc != "COMPLETED") || (crit.stat == "2" && pt.status_rc != "SUBMITTED" && pt.status_rc != "STARTED") || (pt.status_rc == 'LAPSED') || (pt.status_rc == 'SUPERSEDED')){
            rtn = false;
        }else if (Math.sqrt(pt.socialHousingImpact * pt.socialHousingImpact) < crit.shi){
            rtn = false;
        }*/
        return rtn;
    }

   
    self.getCriteria = function(){
        var crit = {
          stat: self.ctlRef["statusDropdown"].options[self.ctlRef.statusDropdown.selectedIndex].value,
          borough: self.ctlRef.borDropdown.options[self.ctlRef.borDropdown.selectedIndex].value,
          shi: self.ctlRef["shiSlider"].value,
          dtlow: self.ctlRef["datFrom"].value,
          dthigh: self.ctlRef["datTo"].value,
          legend: "absolute_sh"
        };
        return crit
    }

    self.displayDetails = function(pt){
        self.pointer.refocus(pt.lat, pt.lon);
        self.tabs.openTabById(self.id);
        text = "<p><strong>Borough Ref:</strong> " + pt.borough_ref + "</p>";
        text += "<p><strong>Address:</strong> " + pt.prim_add_obj_name + " " +  pt.street + ", " + pt.post_code + "</p>";
        text += "<p><strong>Borough:</strong> " + pt.borough_name + "</p>";
        text += makeHousingTable(pt);
        text += makeSpaceTable(pt);
        text += "<p><strong>Status: </strong> " + pt.status_rc + "</p>";
        text += "<p><strong>Permission granted on:</strong> " + pt.permission_date + "</p>";
        if (pt.status_rc == "COMPLETED"){
            text += "<p><strong>Completed on: </strong> " + pt.completed_date + "</p>";
        } else {
            text += "<strong>Permission lapses on: </strong>" + pt.permission_lapses_date;
        }
        text += "<p><strong>Description:</strong> " + pt.descr + "</p>";
        self.ctlRef.housingDetails.innerHTML = text;
    }

    self.deleteThis = function(){
        self.removeMarks();
        self = null;
    }

    function makeHousingTable(pt){
        var erl = getExistingLines(pt, "existingHousing");
        var existH = getAppLines(erl, "housing", "exist");
        appStages = pt.appStages.appStage;
        var prl = getLinesFromAppStages(appStages, "proposedHousing"); 
        var propH = getAppLines(prl, "housing", "prop");
        var ht = "";
        if (!!prl || !!erl){
            var hl = createChangeList(existH, propH, "housing", self.resCat);
            var ht = makeTableHTML(hl, "Housing Units", "housingTable");
        }
        return ht;
    }

    function makeSpaceTable(pt){
        var erl = getExistingLines(pt, "existingSpace");
        var existH = getAppLines(erl, "space", "exist");
        var prl = null;
        if (pt.appStagesSpace != null){
          appStages = pt.appStagesSpace.appStage;
          prl = getLinesFromAppStages(appStages, "proposedSpace"); 
        }
        var propH = getAppLines(prl, "space", "prop");
        var ht = "";
        if (!!prl || !!erl){
            var hl = createChangeList(existH, propH, "space", self.spaceCat);
            ht = makeTableHTML(hl, "Hectares of Space", "spaceTable");
        }
        return ht;
    }

    function getExistingLines(pt, type){
        var erl;
        console.log("looking for " + type);
        if (pt[type] == null){
            erl = null;
        } else {
            erl = pt[type]["line"];
            console.log(type + "detected")
        }
        return erl;
    }

    function getLinesFromAppStages(appStages, type){
        var prl;
        console.log("Looking for " + type);
        if (Array.isArray(appStages)){
            l = appStages.length;
            prl = appStages[l][type]["line"];
        } else {
            if (appStages[type] == null){
                prl = null; 
            }else{
                prl = appStages[type]["line"];
            }
        }
        return prl;
    }

   function getAppLines(rl, type, debug){
        var rh = {};
        var cat;
        var unit;
        if (type == "housing"){
            cat = "housingtype";
            unit = "units";
        }else if (type == "space"){
            cat = "spacetypecode";
            unit = "hectares";
        }
        if (Array.isArray(rl)){
            for(i=0; i< rl.length; i++){
                console.log("Array element - " + debug + type + " " + rl[i][cat] + " : " + rl[i][unit]);
                rh[rl[i][cat]]= rl[i][unit];
            }
        }else if (!!rl){
            console.log("Single element - " + debug + type + " " + rl[cat] + " : " + rl[unit]);
            rh[rl[cat]] = rl[unit];
        }
        return rh; 
    }

    function createChangeList(erh, prh, type, catset){
        var krc = Object.keys(catset);
        var hl = [];
        console.log("Creating " + type + " table");
        for (var i=0; i<krc.length; i++){
            console.log("calculating " + type + " line");
            var ev = 0;
            var pv = 0;
            var val = false;
            if (!!erh[krc[i]]){
                ev = erh[krc[i]];
                console.log("Adding existing : " + ev);
                val = true;
            }
            if (!!prh[krc[i]]){
                pv = prh[krc[i]];
                console.log("Adding proposed : " + ev);
                val = true;
            }
            if (val){ 
                var l;
                l = {
                    htype: catset[krc[i]],
                    exist: parseFloat(ev), 
                    prop: parseFloat(pv),
                    net: pv - ev
                }
                hl.push(l);
                console.log("type: " + l.htype + "; existing: " + l.exist + "; proposed: " + l.prop + "; net: " + l.net); 
            }
        }
        var ttl = { htype: "Total", exist: 0, prop: 0, net: 0 };
        for (var i=0; i<hl.length; i++){
            console.log("Datatype...");
            console.log(typeof hl[i].exist);
            ttl.exist += parseFloat(hl[i].exist);
            ttl.prop += parseFloat(hl[i].prop);
            ttl.net += parseFloat(hl[i].net);
        }
        hl.push(ttl);
        return hl;
   }    

 
    function makeTableHTML(hl, title, id){
        console.log("Making table");
        if (id == "spaceTable"){ 
            rnd = 3;}
        else if (id == "housingTable"){
            rnd = 0;
        }
        hTable = "<strong>" + title + "</strong>\n<table id='" + id + "'>\n<tr>\n\t<th>Type</th>\n\t<th>Existing</th>\n\t<th>%</th>\n\t<th>Proposed</th>\n\t<th>%</th>\n\t<th>Change</th>\n</tr>\n";
        for (i=0; i<hl.length; i++){
            existPc = Math.round((hl[i].exist / hl[hl.length-1].exist) *100);
            propPc = Math.round((hl[i].prop / hl[hl.length-1].prop) *100);
            hTable += "<tr>\n\t<td>" + hl[i].htype + "</td>\n";
            hTable += "\t<td>" + hl[i].exist.toFixed(rnd) + "</td>\n";
            hTable += "\t<td>" + existPc + "%</td>\n";
            hTable += "\t<td>" + hl[i].prop.toFixed(rnd) + "</td>\n";
            hTable += "\t<td>" + propPc + "%</td>\n";
            var pm = "";
            if (hl[i].net > 0){
                pm = "+";
            }
            hTable += "\t<td>" + pm + hl[i].net.toFixed(rnd) + "</td>\n</tr>\n";
        }
        hTable +="</table>\n";
        return hTable;
    }
 
}
