looker.plugins.visualizations.add({
    // The options variable allows config settings to be set in the viz. 
    // These config settings get pSSED Back through on each async update.
    options: {
        font_size: {
          type: "string",
          label: "Font Size",
          values: [
            {"Large": "large"},
            {"Small": "small"}
          ],
          display: "radio",
          default: "large"
        }
      },
    create: function(element, config) {
        var css = element.innerHTML = `
            <style>
                .hello-world-vis {
                    // Vertical centering
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                }
                </style>    
            `;

        // Create a container element to let us center the text.
        var container = element.appendChild(document.createElement("div"));
        container.className = "hello-world-vis";

        // Create an element to contain the text.
        this._textElement = container.appendChild(document.createElement("div"));
    },
    updateAsync: function(data, element, config, queryResponse, details, done) {

        // It's easy for charts to display custom error messages if they 
        // encounter problems while trying to render. Looker will add two functions 
        // to your visualization object: addError and clearErrors that can be used 
        // to display a nice error message to the user.

        // Clear any errors from previous updates.
        this.clearErrors();

        // Throw some errors and exit if the shape of the data isn't what this chart needs.
        if (queryResponse.fields.dimensions.length == 0) {
            this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
            return;
        }    

        // Grab the first cell of the data.
        var firstRow = data[0];
        var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

        console.log(firstCell);

        // Insert the data into the page.
        this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);
    
            

        // Always call done to indicate a visualization has finished rendering.
        done()
    }
})