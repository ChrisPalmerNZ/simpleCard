/*
 *  Power BI Visualizations
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

"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class defaultOptionSettings {
  public defaultNull: string = "Nil"
}
export class CallOutSettings {
  public fontColor: string = "#000";
  public fontSize: number = 38;
  public verticalOffset = 0;
  public fontFamily: string = "wf_standard-font, helvetica, arial, sans-serif";
  public bold: boolean = false;
  public italic: boolean = false;
  public labelDisplayUnits: number = 1; 
  public labelPrecision: number = 0; 
}
export class LabelSettings {
  public show: boolean = true;
  public fontColor: string = "#A6A6A6";
  public fontSize: number = 14;
  public fontFamily: string = "'Segoe UI', wf_segoe-ui_normal, helvetica, arial, sans-serif";
  public bold: boolean = false;
  public italic: boolean = false;
}
export class CircleSettings {
  public show: boolean = false;
  public circleColor: string = "white";
  public circleThickness: number = 2;
}
export class VisualSettings extends DataViewObjectsParser {
  public defaultOptions: defaultOptionSettings = new defaultOptionSettings();
  public calloutvalue: CallOutSettings = new CallOutSettings();
  public categorylabel: LabelSettings = new LabelSettings();
  public circle: CircleSettings = new CircleSettings();
}

