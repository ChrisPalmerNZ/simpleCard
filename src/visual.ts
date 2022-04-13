/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
/*
This visual is built over the Circle Card visual example provided by Microsoft. 
Although it retains the Circle Card object, its main function is to provide the
ability to specify a different default for the (Blank) that is returned when data
is unavailable. The justification for this is because (Blank) on a dashboard is 
very often meaningless to end users who don't understand the meaning of it, and
who may prefer to see some other value. In this case the new default is "Nil", 
but it can be edited.
*/

"use strict";

import "core-js/stable";
import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import { textMeasurementService } from "powerbi-visuals-utils-formattingutils";
import { TextProperties } from "powerbi-visuals-utils-formattingutils/lib/src/interfaces";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { VisualSettings } from "./settings";
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import IVisualHost = powerbi.extensibility.IVisualHost;

import DataViewObjects = powerbi.DataViewObjects;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import { valueFormatter as vf, textMeasurementService as tms } from "powerbi-visuals-utils-formattingutils";
import IValueFormatter = vf.IValueFormatter;

import * as d3 from "d3";
type Selection<T extends d3.BaseType> = d3.Selection<T, any, any, any>;

export class Visual implements IVisual {
    private host: IVisualHost;
    private dataView: DataView;
    private hostService: IVisualHost;
    private svg: Selection<SVGElement>;
    private container: Selection<SVGElement>;
    private circle: Selection<SVGElement>;
    private textValue: Selection<SVGElement>;
    private textLabel: Selection<SVGElement>;
    private visualSettings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        this.hostService = options.host;
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('circleCard', true);
        this.container = this.svg.append("g")
            .classed('container', true);
        this.circle = this.container.append("circle")
            .classed('circle', true);
        this.textValue = this.container.append("text")
            .classed("textValue", true);
        this.textLabel = this.container.append("text")
            .classed("textLabel", true);
    }

    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        const settings: VisualSettings = this.visualSettings || <VisualSettings>VisualSettings.getDefault();
        return VisualSettings.enumerateObjectInstances(settings, options);
    }

    public update(options: VisualUpdateOptions) {
        this.dataView = options.dataViews[0];
        this.visualSettings = VisualSettings.parse<VisualSettings>(this.dataView);

        var outputString: string = <string>this.dataView.single.value;

        if (this.dataView != null) {
            var value: number = <number>this.dataView.single.value;
            var column: DataViewMetadataColumn = this.dataView.metadata.columns[0];
            var valueFormat: string = column.format;
            var valueFormatter = vf.create({
                format: valueFormat,
                precision: this.visualSettings.calloutvalue.labelPrecision,
                value: this.visualSettings.calloutvalue.labelDisplayUnits || value
                //,
                //cultureSelector: this.hostService.locale  
            });

            var valueString: string = valueFormatter.format(value);
            outputString = valueString;
        }

        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr("width", width);
        this.svg.attr("height", height);
        let radius: number = Math.min(width, height) / 2.2;
        
        this.visualSettings.circle.circleThickness = Math.max(0, this.visualSettings.circle.circleThickness);
        this.visualSettings.circle.circleThickness = Math.min(10, this.visualSettings.circle.circleThickness);
        
        if (outputString == "(Blank)" && this.visualSettings.defaultOptions.defaultNull) {
            outputString = this.visualSettings.defaultOptions.defaultNull
        }

        this.circle
            .style("fill", this.visualSettings.circle.circleColor)
            .style("fill-opacity", 0.5)
            .style("stroke", "black")
            .style("stroke-width", this.visualSettings.circle.circleThickness)
            .attr("r", radius)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("visibility", this.visualSettings.circle.show? "visible": "hidden");
        
        let fontSizeValue: number = 0

        if (! this.visualSettings.circle.show) {
            fontSizeValue = Math.min(width, height) / 3.2
        } else {
            fontSizeValue = Math.min(width, height) / 4.5
        }   

        fontSizeValue = Math.min(fontSizeValue, this.visualSettings.calloutvalue.fontSize);

        let textValueProperties: TextProperties = {
            text: outputString,
            fontFamily: this.visualSettings.calloutvalue.fontFamily,
            fontSize: fontSizeValue + "pt"
        };
        
        let textValueHeight: number  = textMeasurementService.measureSvgTextHeight(textValueProperties)

        this.textValue
            .text(outputString)
            .attr("x", "50%")
            .attr("y", this.visualSettings.calloutvalue.verticalOffset > 0? 
                        this.visualSettings.calloutvalue.verticalOffset + "%":
                        this.visualSettings.categorylabel.show? "58%": "68%")
            .attr("text-anchor", "middle")
            .attr("fill", this.visualSettings.calloutvalue.fontColor) 
            .attr("font-family", this.visualSettings.calloutvalue.fontFamily)
            .attr("font-weight", this.visualSettings.calloutvalue.bold? "bold": "normal")
            .attr("font-style", this.visualSettings.calloutvalue.italic? "italic": "normal")            
            .attr("font-size", fontSizeValue + "pt");  // using pt instead of px...
       
        let yPerc = Number(this.textValue.attr("y").replace("%", ""))/100
        let yTextValuePerc = textValueHeight / height
        let yNewPerc = (yPerc + (yTextValuePerc / 2)) * 100

        let fontSizeLabel: number = Math.min(fontSizeValue / 2.5, this.visualSettings.categorylabel.fontSize);
        
        this.textLabel
            .text(this.dataView.metadata.columns[0].displayName)
            .attr("x", "50%")
            .attr("y", yNewPerc + "%")
            .attr("dy", 2.5)
            .attr("text-anchor", "middle")
            .attr("fill", this.visualSettings.categorylabel.fontColor) 
            .attr("opacity", 0.8)
            .attr("font-family", this.visualSettings.categorylabel.fontFamily)
            .attr("font-size", fontSizeLabel + "pt")
            .attr("font-weight", this.visualSettings.categorylabel.bold? "bold": "normal")
            .attr("font-style", this.visualSettings.categorylabel.italic? "italic": "normal")
            .attr("visibility", this.visualSettings.categorylabel.show? "visible": "hidden");
    }
}    