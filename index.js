const express = require("express");
const app = express();
require("./model/connect");
const agentinfo = require('./model/agent');
const bodyParser = require("body-parser");
const ejs = require('ejs');
const path = require('path');
const cors = require("cors");
const fs = require('fs');
const PDFDocument = require('pdfkit');

app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function users(req, res, next) {

    const loginUser = await agentinfo.findOne({ $and: [{ mobile: req.body.mobile, password: req.body.password }] });
    console.log(loginUser);
    if (loginUser && loginUser.confirm == 'yes') {
     const pdfFileName = `user_${loginUser._id}.pdf`;
    const pdfPath = `./public/${pdfFileName}`;
    if (!fs.existsSync(pdfPath)) {
        const pdfDoc = new PDFDocument();

        pdfDoc.font('Helvetica-Bold');
        pdfDoc.fontSize(14);
    
        pdfDoc.lineGap(10);
    
        pdfDoc.text('User Details:', { underline: true });
    
        pdfDoc.fontSize(12);
        pdfDoc.text(`Name: ${loginUser.name}`);
        pdfDoc.text(`Company Name: ${loginUser.companyname}`);
        pdfDoc.text(`Email: ${loginUser.email}`);
        pdfDoc.text(`Mobile: ${loginUser.mobile}`);
        pdfDoc.text(`State: ${loginUser.state}`);
        pdfDoc.text(`City: ${loginUser.city}`);
        pdfDoc.text(`Business Experience: ${loginUser.bussinessexp}`);
        pdfDoc.text(`Operating Field: ${loginUser.opreatingfiled}`);
        pdfDoc.text(`Company Website: ${loginUser.companywebsite}`);
        pdfDoc.text(`Sales: ${loginUser.sales}`);
        pdfDoc.text(`Heard About Us: ${loginUser.hearabout}`);
    
        pdfDoc.rect(20, 20, pdfDoc.page.width - 40, pdfDoc.page.height - 40).stroke();
    
        const pdfFileName = `user_${loginUser._id}.pdf`;
        const pdfPath = `./public/${pdfFileName}`;
        pdfDoc.pipe(fs.createWriteStream(pdfPath));
        pdfDoc.end();
    
    }
        const p = await agentinfo.find({ confirm: 'yes' });
        ejs.renderFile('./views/agentpan.ejs', { p , loginUser }, (err, html) => {
            if (err) {
                console.error('Error rendering EJS template:', err);
                res.status(500).send('Internal Server Error');
            } else {
    
                res.send(html);
            }
        });
    }
    else if(loginUser.confirm == "no"){
        res.send("yours profile not accepct ");
    }

    else {
        res.send("yours profile not accepct till now ! please wait some more time")
    }
}

app.get('/', (req, res) => {
    res.render("../views/index.ejs")
})
app.get('/login', (req, res) => {
    res.render("../views/login.ejs")
})
app.post('/login', users, (req, res) => {

})

app.post('/', async (req, res) => {
console.log("address",req.body.state,req.body.city)
    await agentinfo.create({
        name: req.body.name,
        companyname: req.body.cname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        city: req.body.city,
        state: req.body.state,
        bussinessexp: req.body.experience,
        opreatingfiled: req.body.operating_field,
        companywebsite: req.body.web,
        sales: req.body.sales,
        hearabout: req.body.hearabout,
        confirm: req.body.confirm
    }).then((x) => {

        console.log(x);
        res.send("your application is in processing ,check after 1 or 2 days later");
    });
});

app.post('/filterpannel', async (req, res) => {
    const filters = req.body;
    console.log("this is the filter data", filters)
    const p = await agentinfo.find({ confirm: 'yes' });
    console.log(p)
    const allUnchecked = Object.values(filters).every(value => value === false);

    if (allUnchecked) {
        const filteredData = p;
        ejs.renderFile('./views/filteredData.ejs', { filteredData }, (err, html) => {
            if (err) {
                console.error('Error rendering EJS template:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send(html);
            }
        });
        return;
    }
    const filteredData = p.filter(item => {
        return filters[item.opreatingfiled];
    });

    ejs.renderFile('./views/filteredData.ejs', { filteredData }, (err, html) => {
        if (err) {
            console.error('Error rendering EJS template:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(html);
        }
    });
});

app.get("/orgadmin", async (req, res) => {

    const p = await agentinfo.find({ confirm: "" });
    res.render("../views/admin.ejs", { p });
});

app.post("/acceptProfile", async (req, res) => {
    const id = req.body.id;
    const value = req.body.varified;
    const result = await agentinfo.updateOne(
        { _id: id },
        { $set: { confirm: value } }
    );
    res.send({ success: true });
});

app.listen(3000, () => {
    console.log("i am running at port 3000");
});