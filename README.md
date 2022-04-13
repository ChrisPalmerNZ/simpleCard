
# simpleCard

A custom visual based on the Microsoft [Circle Card](https://github.com/microsoft/PowerBI-visuals-circlecard) sample visual. The motivation for the adaptation is to allow a different value other than the default (Blank) to be displayed when there is no data available in the current filter conditions. This is because while (Blank) has a specific meaning derived from the underlying DAX engine, it can be a confusing and possibly disconcerting value for an ordinary user. So, the visual allows a different value to be specified, and it defaults to Nil. 

As with the Circle Card visual, it can render the text of a Power BI card visual in a circle, and it will resize the text dynamically as the visual is resized.

Additional functionality:
- Allows a new default to be specified instead of (Blank) if filter conditions result in no data
- The circle feature is optional and by default is not turned on
- Adds extra functionality to Data and Category labels, following the standard Card visual 
- Maximums for the font sizes of the Data Label and Category Label can be specified 
    - This enables the font size to be smaller that the currently calculated value, to enforce uniformity of font size between different sized cards 
- Enables the vertical position of the Data Label to be specified

### Support
    
Please leave requests via Github, or contact chris.palmer.nz@gmail.com for any specific support

----
## Detailed descriptions

### Options
    
![Options](https://github.com/ChrisPalmerNZ/simpleCard/blob/master/Images/options.PNG?raw=true)
   
The options allow a replacement value for the (Blank) normally used for nulls, the default is Nil

</br>

### Data label

![Data label](https://github.com/ChrisPalmerNZ/simpleCard/blob/master/Images/Data_label.PNG?raw=true)

- Maximum text size allows the text size to be limited to the specified maximum as cards are enlarged
    - default is 38pt
    - set to 60 to allow for the largest possible size
- Vertical offset allows the vertical placement of the Data label to be altered. It is a percentage
- Color, Font family, Bold, Italic, Display Units and Value decimal places are all in accordance with the standard Card visual
    
</br>

### Category label

![Category label](https://github.com/ChrisPalmerNZ/simpleCard/blob/master/Images/Category_label.PNG?raw=true)

- Category label can be turned off
- Default is 14pt
- As with the Data label, maximum text size can be set
- Color, Font family, Bold, Italic are in accordance with the standard Card visual
    
</br>

### Circle

![Circle](https://github.com/ChrisPalmerNZ/simpleCard/blob/master/Images/circle.PNG?raw=true)

- Per the original Circle option from the Circle Card visual
- Allows color and circle thickness to be specified
- Can be turned off, and is off by default

----

## Circle Card Custom Visual - original documentation

![Circle Card](https://docs.microsoft.com/en-us/power-bi/developer/media/custom-visual-develop-tutorial/circle-developer-visual.png)

This repository represents a simple way to use Power BI Custom Visuals Tools. Circle Card shows singular value inside a circle. It supports basic visual settings (color and circle thickness) and adaptability to viewport size.

Custom Visual development basics are explained in [this tutorial](https://docs.microsoft.com/en-us/power-bi/developer/custom-visual-develop-tutorial). It describes step-by-step creation of Circle Card. You're welcome to use that example as a base to your own Custom Visuals by cloning this repository or using `pbiviz new` command of [Power BI Visuals Tools](https://github.com/Microsoft/PowerBI-visuals-tools).

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
