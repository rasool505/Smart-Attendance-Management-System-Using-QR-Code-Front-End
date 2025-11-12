
export function Print(reports){

    const printWindow = window.open('', '', 'width=800,height=600');
    const head = reports?.report[0].dates.map((d, i) => (
                        `<th key=${i}>
                            ${d.date}
                        </th>`
                    )).join('');
    console.log(head)
    const dataShow = reports?.report?.map((item, index) => 
                `<tr key=${index}>
                <td>${index + 1}</td>
                <td>${item.studentName}</td>
                ${item.dates.map((d, i) => (
                    `<td key=${i}>
                        ${d.status}
                    </td>`
                )).join('')}
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
        <div style="width: 100%; display: flex; padding: 8px; box-sizing: border-box;">
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px; flex: 1;">
            <label>Instructor Name: ${reports.instructorName}</label>
            <label>Subject Name: ${reports.subjectName}</label>
            <label>Department: ${reports.department}</label>
            <label>Stage: ${reports.stage}</label>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 6px;">
            <label>Total Lectures: ${reports.totalSessions}</label>
            <label>Academic Year: ${(reports.year + 1)}-${reports.year}</label>
        </div>
        </div>
        <table>
            <thead>
            <tr>
                <th>No.</th>
                <th>Student Name</th>
                ${head}
            </tr>
            </thead>
            <tbody>
            ${dataShow}
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        </body>
    </html>` ;

    printWindow.document.write(tableContent);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

