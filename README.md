📄 Certificate PDF Generator
This project allows you to generate customized certificate PDFs via an HTTP API using Node.js and pdfmake.

🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/Certificate-PDF-Generate.git
cd Certificate-PDF-Generate

2. Install dependencies
npm install

3. Start the server

npm run start
The server will start on http://localhost:3000 by default.

📥 Generate PDF
You can generate a certificate PDF by sending a POST request to /generate.

Example using curl:

curl --location 'http://localhost:8181/generate-certificate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "registerId":"847938934",
    "email":"yadavrhr@gmail.com",
    "name":" Rajesh Yadav",
    "phone":"+919910892371",
    "address":"Anand Farm, Sector 22",
    "city":"Gurugram",
    "zip":"122016",
    "state":"Haryana",
    "country":"India",
    "dob":"20-01-1980",
    "gender":"Male",
    "bloodGroup":"A+"

}'

📁 Output
Generated PDFs are saved inside the pdf/ directory.