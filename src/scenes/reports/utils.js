import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export async function exportPdfChart(id, reportTitle) {
    const padding = 30;
    const doc = new jsPDF("l", "px");

    const element = document.getElementById(id);
    console.log("element: ", element);
    const imageData = await toPng(element);

    let elementWidth = element.offsetWidth;
    let elementHeight = element.offsetHeight;

    const pageWidth = doc.internal.pageSize.getWidth();

    console.log("element w: ", elementWidth);
    console.log("page w: ", pageWidth);

    if (elementWidth > pageWidth) {
        let ratio = pageWidth / elementWidth;
        elementHeight = elementHeight * ratio - 10;
        elementWidth = elementWidth * ratio - padding;
    }

    doc.setFontSize(24);
    doc.text(30, 50, reportTitle);
    doc.addImage(imageData, "PNG", 15, 70, elementWidth, elementHeight);
    doc.save("total_report.pdf");
}
