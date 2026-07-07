import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import Candidate from "../models/Candidate.js";

const BASE_URL = process.env.BASE_URL;

export const generateOfferAndNDA = async (req, res) => {
  try {

    const dir = path.join("src/uploads/documents");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const {
      candidateId,
      role,
      salary,
      startDate,
      manager,
      location,
    } = req.body;

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    // ---------------- FILE PATHS ----------------

    const offerFileName = `offer-${candidate._id}.pdf`;
    const ndaFileName = `nda-${candidate._id}.pdf`;

    const offerPath = path.join(
      "src/uploads/documents",
      offerFileName
    );

    const ndaPath = path.join(
      "src/uploads/documents",
      ndaFileName
    );

    // ---------------- OFFER LETTER ----------------

    const offerDoc = new PDFDocument();

    offerDoc.pipe(fs.createWriteStream(offerPath));

    offerDoc
      .fontSize(22)
      .text("ROVE TECHNOLOGIES", {
        align: "center",
      });

    offerDoc
      .fontSize(18)
      .text("Offer Letter", {
        align: "center",
      });

    offerDoc.moveDown();

    offerDoc.fontSize(13);

    offerDoc.text(`Candidate: ${candidate.name}`);
    offerDoc.text(`Role: ${role}`);
    offerDoc.text(`Salary: ${salary}`);
    offerDoc.text(`Start Date: ${startDate}`);
    offerDoc.text(`Reporting Manager: ${manager}`);
    offerDoc.text(`Location: ${location}`);

    offerDoc.moveDown();

    offerDoc.text(
      "We are delighted to offer you employment with ROVE Technologies. We look forward to having you join our team and contribute to our continued success."
    );

    offerDoc.moveDown();

    offerDoc.text(
      "Please confirm your acceptance by signing below."
    );

    offerDoc.moveDown();

    offerDoc.text("Employee Signature: __________________");

    offerDoc.moveDown();

    offerDoc.text("HR Signature: __________________");

    offerDoc.end();

    // ---------------- NDA ----------------

    const ndaDoc = new PDFDocument();

    ndaDoc.pipe(fs.createWriteStream(ndaPath));

    ndaDoc
      .fontSize(22)
      .text("ROVE TECHNOLOGIES", {
        align: "center",
      });

    ndaDoc
      .fontSize(18)
      .text("Non-Disclosure Agreement", {
        align: "center",
      });

    ndaDoc.moveDown();

    ndaDoc.fontSize(13);

    ndaDoc.text(`Employee: ${candidate.name}`);

    ndaDoc.text(
      `Date: ${new Date().toLocaleDateString()}`
    );

    ndaDoc.moveDown();

    ndaDoc.text(
      "The employee agrees to maintain the confidentiality of all proprietary, technical, financial and customer information obtained during employment."
    );

    ndaDoc.moveDown();

    ndaDoc.text("Employee Signature: __________________");

    ndaDoc.moveDown();

    ndaDoc.text("Company Signature: __________________");

    ndaDoc.end();

    // ---------------- UPDATE CANDIDATE ----------------

    candidate.status = "Offer Sent";

    candidate.offerLetter = offerPath;
    candidate.nda = ndaPath;

    candidate.timeline.push({
      title: "Offer Sent",
      description: "Offer Letter and NDA generated",
    });

    await candidate.save();

    res.json({
      message: "Offer documents generated successfully",
      offerLetter: `${BASE_URL}/uploads/documents/${offerFileName}`,

      nda: `${BASE_URL}/uploads/documents/${ndaFileName}`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};