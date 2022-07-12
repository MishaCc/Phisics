whoWroteIt("4", "Математичний маятник",
    "Беккер Михайло", "ІПЗ-21-1(1)");
function whoWroteIt(lessonNumber, lessonTheme,
                    studentName, studetnGroup) {
    document.write("Практичне заняття " +
        lessonNumber);
    document.write("<h2>" + lessonTheme + "</h2>");
    document.write("<p>" + studentName + "</p>");
    document.write("<p>" + studetnGroup + "</p>");
}