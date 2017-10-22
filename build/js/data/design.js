
charts.push(
    {
        id:"chartjs-design",
        data:{ 
            "type": "polarArea", 
            "data": { 
                "labels": ["Photoshop", "Illustrator", "Indesign", "Sketch", "XD"], 
                "datasets": [
                    { 
                        "label": "My First Dataset", "data": [5, 5, 5, 3, 2], 
                        "backgroundColor": ["rgb(255, 99, 132)", "rgb(75, 192, 192)", "rgb(255, 205, 86)", "rgb(201, 203, 207)", "rgb(54, 162, 235)"]
                    }
                ]
            },
            "options": {
                deferred: {           // enabled by default
                    yOffset: "100%",  
                    delay: 500        
                },
                legend: {
                    display:false
                },
                scale: {
                    gridLines: {
                        
                        drawTicks:false
                    },
                    ticks:{
                        display:false
                    }
                }
                
            } 
        }
    }
)