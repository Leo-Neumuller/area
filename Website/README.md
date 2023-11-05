# Website

## Installation

Needed:
- Node JS

### Install dependencies

```bash
npm i
```

### Basic Usage

```bash
./run.sh
```

### Run Test

```bash
npm run test
```

## Components 
|       Names    |Description                    |Arguments                    |
|----------------|-------------------------------|-----------------------------|
|AllFluxPage     | Sub-category of the dashboard that conatin all the flux         |            |
|ApplicationPage| Sub-category of the dashboard that conatin all the services of the app|            |
|AppPres|Used on the home page to showcase the different use of the website|title:string;<br>text:  string;<br>image:  string;<br>hideButton?:  boolean;<br>buttonText?:  string;<br>onCLick?: () =>  void;|
|AppSpotlight|Used to display a service in the whole app|name:  string;
|Button|Custom button to make it easier to style in the app chart|className?:  string;<br>onClick?: () =>  void;<bR>type?:  string;
|DashboardButton| Another custom button for the same reason|export  let  label: string;<bR>export  let  onClick: () =>  void;<br>export  let  selected: boolean;
|DashboardPage|Sub-category of the dashboard that allow the user to deactivate his flux|
|Editor|`Board`: Component that is used to hold the other and create the Flux<br>`Nodes`: Component that is used to represent Action and Reactions<br>`Edges`: Component that is use to represent the links between the nodes<br>`AddButton`: Component allowing the user to add new nodes<br>`InputData`: Component use to get data from the node above
|FluxCard|Component that is used to display the Fluxs that the user created|let  flux: {id: number;name: string; description: string; active: boolean; action: string; reaction: string;};<br>let  deleteButton: boolean ;
|FluxRow|Used to display fluxs and deactivate them|description:  string;<br>active:  boolean;<br>index:  number;<br>id:  number;<br>logo: {action:  string, reaction:  string};
|Icon|Given a name display the svg logo associated|name:  string;<br>className:  string;
|Input|Custom input to make it easier to style in the app chart|className?:  string;<br>placeholder?:  string;<br>name?:  string;<br>type?: string
|ProfilePage|Sub-category of the dashboard that contain the users information
|Select|  Custom Select to make it easier to style in the app chart|let  options: string<br>value: string<br>placeholder: string;<br>onChange: (value: string) =>  void;
|SVGs| Contains all Svg for the Website, they all have the same args|className:  string;<br>color:  string;

## Editor Structure
Here is the representation of how the Flux Editor works in its globality
	
[![](https://mermaid.ink/img/pako:eNp1kMFOwzAMhl8l8rl7gQohbSqHHQBp5YRyMbG7Raxx5TkgtO3dCe2GmCpycvx9zh_5CEGIoYZuL59hh2rupfHJlbMSVHKLxb1bEq2ymSQ3kZb1IwYeWZvfLtc52zAGi5LmZDn23Szoj_5U_rVOxtrhzdB_9DbsEnBXyOk525CtQcOTe6AtHyZlLCdjnX6F6zNQQc_aY6SynOPPhAfbcc8e6lIS6rsHn87Fw2zSfqUAtWnmCvJAaNxE3Cr2UHe4P5QuUzTRx2nb49IrGDC9ilyd8zesgoCa?type=png)](https://mermaid.live/edit#pako:eNp1kMFOwzAMhl8l8rl7gQohbSqHHQBp5YRyMbG7Raxx5TkgtO3dCe2GmCpycvx9zh_5CEGIoYZuL59hh2rupfHJlbMSVHKLxb1bEq2ymSQ3kZb1IwYeWZvfLtc52zAGi5LmZDn23Szoj_5U_rVOxtrhzdB_9DbsEnBXyOk525CtQcOTe6AtHyZlLCdjnX6F6zNQQc_aY6SynOPPhAfbcc8e6lIS6rsHn87Fw2zSfqUAtWnmCvJAaNxE3Cr2UHe4P5QuUzTRx2nb49IrGDC9ilyd8zesgoCa)