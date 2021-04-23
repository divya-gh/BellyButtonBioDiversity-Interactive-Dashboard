//---------------------//
// Initialize the plot //
//---------------------//

function init(x,y,z) {
    // create a trace for the bar Chart
var trace1 = {
    x: x , 
    y: y,
    text:z,
    type: 'bar',
    orientation : 'h'
};

var layout = {
    title: `<b>Top 10 OTUs<b>`,
    hoverlabel:{
    bgcolor: "black",
    font: {color: 'white'}
      },
           };

 var data = [trace1];

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data, layout, {responsive : true});
}

//------------------------------------------------------------------------------------//
//Since using a web call d3.jscon would not deploy the dashboard on gitHub pages, I decided to directly call the object into a variable
var data = samples;
//Print data
console.log('Main data : ' , data)

//Get subject ID as names 
var names = data.names ;
//console.log(names) ;

//Set subject ID as an option in select tag, get select tag
selectOption = d3.select('#selDataset') ;
//console.log(selectOption) ;

// assign subject ID to each option
names.forEach(item => {      
    selectOption.append('option').attr('value', item).text(item)
})


//-------------------------------------------------------------------//
//get initial subject ID - Default ID
//--------------------------------------------------------------------//

// get ID
firstSubId = d3.selectAll('#selDataset').node().value;
//print
console.log('default subject ID :' , firstSubId)

//---------------//
//Plot bar chart
//---------------//

//get data for initial subject iD
var top10Obj = getDataForID(firstSubId);
console.log(`Data for default ${firstSubId}:`, top10Obj)

//call init function to desplay default plot
init(top10Obj[0].topOtuSamples , top10Obj[0].topOtuIds, top10Obj[0].topOtuLabels);


//--------------------------------------------//
//print demographic information for the default ID
//--------------------------------------------//
//call the function generate demographic info
var metaData = metaDataforID(firstSubId) ;        
       
//--------------------------------------------//
//Create a buuble chart -default ID
//--------------------------------------------//

//call function to create bubble chart

bubbleGetDataForId(firstSubId) ;


//--------------------------------------------//
//Create a guage -default ID
//--------------------------------------------//
var washingFreq = metaData[0].wfreq ;
console.log("washing: freq", washingFreq)
//call function
guageScale(washingFreq) ;

//---------------------------------------------------------------------//
//on change : on selection of subject iDs
//---------------------------------------------------------------------//

// for each selection option, get data
d3.selectAll("#selDataset").on("change", getData);

//function on change
function getData() {
    //get the dropDownMenu value
    dropDownMenu = d3.selectAll('#selDataset').node();
    selectedDrpDownValue = dropDownMenu.value ;
    //console.log(selectedDrpDownValue);
    
    //call function to get top 10 data for selected subject ID
    var topOtuSampleObj = getDataForID(selectedDrpDownValue)
    //check sample
    console.log(`data for ID ${selectedDrpDownValue}:` , topOtuSampleObj)

    //get x and y values from the object and sort in ascending
    var x = topOtuSampleObj[0].topOtuSamples ;
    var y = topOtuSampleObj[0].topOtuIds ;
    var z = topOtuSampleObj[0].topOtuLabels ;
        
    //restyle the plots
    Plotly.restyle('bar', "x", [x]);
    Plotly.restyle('bar', "y", [y]);
    Plotly.restyle('bar', "text", [z]);

    //call metadataId function to generate metadata info
    var washFreq = metaDataforID(selectedDrpDownValue) ;

    //call function bubbleGetDataForId for the seelcted ID
    bubbleGetDataForId(selectedDrpDownValue) ;

    //call function to create a guage
    guageScale(washFreq[0].wfreq)

}


//-----------------------------------------------------//
// Function to get data for the selected subject ID
//-----------------------------------------------------//
function getDataForID(id) {
    var sampleObj = data.samples.filter(obj => obj.id === id) ;
    console.log(`All data for slected ID ${id}` , sampleObj) ;

    var top10Obj = [{
    topOtuIds : sampleObj[0].otu_ids.slice(0,10).map(item => 'OTU ' + item.toString()).reverse() ,
    topOtuLabels : sampleObj[0].otu_labels.slice(0,10).reverse() ,
    topOtuSamples : sampleObj[0].sample_values.slice(0,10).reverse()    
    }];
    
    console.log(`Top 10 data for slected ID ${id}` , top10Obj) ;
    
    return top10Obj ;
}

//-----------------------------------------------------//
//create a function to get meatadata for the selected ID
//-----------------------------------------------------//

function metaDataforID(ID) {
    demoInfo = d3.select('#sample-metadata') ;
    //console.log('demographic info node:',demoInfo)

    var defaultMetadata = data.metadata.filter(obj => obj.id.toString() === ID) ;
    //console.log("Default Metadata", defaultMetadata);

    //create a demgraphic info panel with matadata
    var newMetadataInfo = defaultMetadata.map(obj => { 
        obj = {'id': obj.id , 'ethnicity': obj.ethnicity, 'gender': obj.gender, 'age': obj.age, 'location': obj.location, 'bbtype': obj.bbtype, 'wfreq': obj.wfreq }
        return obj;                                  
                                                    });
    //print sorted metadata
    console.log('newmatainfo:', newMetadataInfo)

    //clear old panel values before appending new values
    demoInfo.html("");
    //Using the sorted new metadata obj, append key and value to text panel                        
    newMetadataInfo.forEach(obj => {
        Object.entries(obj).forEach(([key,value]) => { 
            demoInfo.append('p').text(`${key}: ${value}`)
                                                    }); 
                                    });  
    return defaultMetadata ;
}


//-----------------------------------------------------//
//Function to get Bubble Data
//-----------------------------------------------------//
function bubbleGetDataForId(id) {
    var bubbleDataObj = data.samples.filter(obj => obj.id === id) ;
    console.log(`Bubble data for slected ID ${id}` , bubbleDataObj) ;
    
    bubblechart(bubbleDataObj) ;
    
}


//-----------------------------------------------------//
//Function to Create a Bubble Chart
//------------------------------------------------------//
function bubblechart(bubbleData){
    var trace1 = {
        x: bubbleData[0].otu_ids,
        y: bubbleData[0].sample_values,
        text: bubbleData[0].otu_labels,
        mode: 'markers',
        marker: {
          color: bubbleData[0].otu_ids,
          opacity: [2],
          size: bubbleData[0].sample_values,
          
                }
                 };
  
    var data = [trace1];
  
    var layout = {
      title:`<b>Bacteria cultures in T. Sub ID.${bubbleData[0].id}<b>`,
      showlegend: false,
      height:600,
      xaxis: {
          title :{
              text:'<b>OTU ID<b>'
          }
      },
      hoverlabel:{
        bgcolor: "black",
        font: {color: 'white'}
    },
                 };
  
    Plotly.newPlot('bubble', data, layout, {responsive : true});
}

//---------------------------------------------------------//
//Function to create a guage scale
//code from : https://www.instructables.com/Showing-Charts-and-Gauges-of-IOT-Device-Data-Using/
//--------------------------------------------------------//

function guageScale(d) {
    // Enter a speed between 0 and 180
var level = d * 180/9;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .7;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.03 L .0 0.03 L';
     pathX = String(x);
     space = ' ';
     pathY = String(y);
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 20, color:'850000'},
    showlegend: false,
    name: 'freqency',
    text: d,
    hoverinfo: 'text+name',
    },
    
  { values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        stroke:'black',
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: "text",
        textposition: "inside",
        marker: {
          colors: [
            "rgba(24, 130, 100, .5)",
            "rgba(40, 50, 200, .5)",
            "rgba(14, 12, 40, .5)",
            "rgba(200, 154, 102, .5)",
            "rgba(250, 200, 20, .5)",
            "rgba(50, 150, 255, .5)",
            "rgba(150, 20, 200, .5)",
            "rgba(232, 100, 102, .5)",
            "rgba(24, 130, 100, .5)",
            "rgba(255, 255, 255, 0)"
          ]
        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: "label",
        hole: 0.5,
        type: "pie",
        showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per week',  
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout, {responsive : true});
}