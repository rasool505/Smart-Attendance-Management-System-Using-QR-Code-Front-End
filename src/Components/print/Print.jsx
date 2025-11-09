
export function Print(reports){

    const printWindow = window.open('', '', 'width=800,height=600');

    const dataShow = reports?.report?.map((item, index) => 
                `<tr key=${index}>
                <td>${index + 1}</td>
                <td>${item.studentName}</td>
                <td>${item.present}</td>
                <td>${item.absent}</td>
                <td>${item.leave}</td>
                </tr>`
            ).join('')

    const tableContent = 
    `
    <html>
        <head>
        <title>Attendance Report</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: white;
            color: black;
            margin: 0;
            padding: 20px;
            }
            table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            }
            th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
            }
            th {
            background-color: #f2f2f2;
            }
        </style>
        </head>
        <body>
        <h2>Attendance Report</h2>
        <table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Student Name</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Leave</th>
            </tr>
            </thead>
            <tbody>
            ${dataShow}
            </tbody>
            <tfoot>
            <tr>
                <td colspan="4">Total Lectures</td>
                <td> ${reports.totalSessions} </td>
                
            </tr>
            <tr>
                <td colspan="4">Month / Year</td>
                <td> ${reports.month}/${reports.year} </td>
            </tr>
            </tfoot>
        </table>
        </body>
    </html>` ;

    printWindow.document.write(tableContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

