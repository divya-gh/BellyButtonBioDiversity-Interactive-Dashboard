//---------------------//
// Initialize the plot //
//---------------------//

function init(x,y) {
    // create a trace for bar Chart
var trace1 = {
    x: x , 
    y: y,
    type: 'bar',
    orientation : 'h'
};

 var data = [trace1];

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", data, {responsive : true});
}

//------------------------------------------------------------------------------------//
//Since using a web call d3.jscon would not deploy the dashboard on gitHub pages, I decided to directly call the object into a variable
var data = samples;
//Print data
console.log('Main data : ' , data)

//Get subject ID as names f
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
init(top10Obj[0].topOtuSamples , top10Obj[0].topOtuIds);


//--------------------------------------------//
//print demographic information for the default ID
//--------------------------------------------//
//call the function generate demographic info
metaDataforID(firstSubId) ;        
       
                       
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
    
    //restyle the plots
    Plotly.restyle('bar', "x", [x]);
    Plotly.restyle('bar', "y", [y]);

    //call metadataId function to generate metadata info
    metaDataforID(selectedDrpDownValue) ;
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
}
    