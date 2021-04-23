# Plotly.ly-ChallengeBelly Button Biodiversity  - Interactive Dashboard built with HTML, Bootstrap, JavaScript, D3.js, and Plotly.ly.__GitHub Page :__ [divya-gh.github.io/plotly.ly-challenge/](divya-gh.github.io/plotly.ly-challenge/)## Table of contents* [Project Title ](#project-title)* [Description](#description)* [Objective](#objective)* [Screen Shots](#screen-shots)* [Technologies](#technologies)* [Code](#code)* [Status](#status)* [Acknowledgement ](#acknowledgement )* [Contact](#contact)## Project Title : Belly Button Biodiversity ### Description This project aims at building a interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels..### Data Set- The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.## Objective- Update all of the plots below any time that a new sample is selected.- Deploy the app to a free static page hosting service, such as GitHub Pages.### Step 1 - Bar Graph:- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.	* Use sample_values as the values for the bar chart.	* Use otu_ids as the labels for the bar chart.	* Use otu_labels as the hovertext for the chart.### Step 2 - Bubble chart: - Include the following,	* Use otu_ids for the x values.	* Use sample_values for the y values.	* Use sample_values for the marker size.	* Use otu_ids for the marker colors.	* Use otu_labels for the text values.### Step 3 - Demographic information:	* Display the sample metadata, i.e., an individual's demographic information.### Advanced Challenge : Gauge Chart- Create a gauge chart to plot the weekly washing frequency of the individual.	* write a code to account for values ranging from 0 through 9.	* Update the chart whenever a new sample is selected.	## Screen Shots### Step 1 - Bar Graph:![Bar chart](./Images/bar-chart.jpg)### Step 1 - Bubble chart:![Final App](./Images/bubble-chart.jpg)### Step 2 - Demographic information: ![Final App](./Images/Demo-info.jpg)###  Gauge Chart: ![Final App](./Images/Demo-info.jpg)## Technologies and Tools* Jupyter Notebook* Visual Studio code editor#### Python Libraries* pandas* flask/jinja* Web Scraping libraries	* Splinter	* Requests	* BeautifulSoup4	* webdriver_manager		## Code - [mission_to_mars.ipynb](/Missions_to_Mars/mission_to_mars.ipynb)- [scrape_mars.py](/Missions_to_Mars/scrape_mars.py)- [Flask app.py](/Missions_to_Mars/app.py)## Setup1. Git clone this repository2. Open [Flask app.py](/Missions_to_Mars/app.py) in Visual code editor4. Execute the code to launch chrome browser containing scraped data from NASA's Mars sites.## StatusProject Complete## Acknowledgement - UTSA BootCamp## Contact [Divya Shetty](https://github.com/divya-gh) 