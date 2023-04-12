# A few notes about implementation of DJinni Front End Test assignment

## Styles

In this task Bootstrap (5) CSS framework is used with small injection of custom styling. Custom CSS class names are following such name convention: dj- prefix in all such classes. In some places I override Bootstrap classes to align them with the design

## Scripts

Text truncating on the second row  is realized by Vanilla JS. It's integrated into 'infinite scroll ' feature


Switcher to Dark theme is small piece of simple JavaScript, which adds 'dark-theme' css class to body (Switcher is located instead of not denoted feature for Latest/Newest cards)

Boostrap 5 JS bundle is included to enable navigation toggling on small screens

## Images


For side menu I used inline SVG images. Maybe it's not the best solution as code becomes more dificult to read. Idea was to reduce requests to server and it's easy manipulate with colors of SVG images directly in CSS when we need different states (hover, ect)
