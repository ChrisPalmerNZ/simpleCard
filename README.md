
# simpleCard

A custom visual based on the Microsoft [Circle Card](https://github.com/microsoft/PowerBI-visuals-circlecard) sample visual. The motivation for the adaptation is to allow a different value other than the default (Blank) to be displayed when there is no data available in the current filter conditions. This is because while (Blank) has a specific meaning derived from the underlying DAX engine, it can be a confusing and possibly disconcerting value for an ordinary user. So, the visual allows a different value to be specified, and it defaults to Nil. 

As with the Circle Card visual, it can render the text of a Power BI card visual in a circle, and it will resize the text dynamically as the visual is resized.

Additional functionality:
- Allows a new default to be specified instead of (Blank) if filter conditions result in no data
- The circle feature is optional and by default is not turned on 
- Maximums for the font sizes of the Data Label and Category Label can be specified 
    - This enables the font size to be smaller that the currently calculated value, to enforce uniformity of font size between different sized cards 
- Enables the vertical position of the Data Label to be specified

### Support
Please leave requests via Github, or contact chris.palmer.nz@gmail.com for any specific support

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
