document.addEventListener('DOMContentLoaded', function () {
    (getAllEmployee = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const name = urlParams.get('name');
            const url = "http://localhost:5501/api/v1/employees" + (name ? `?name=${name}` : "");

            const response = await fetch(url);
            const data = await response.json();
            let sum = 0
            data.forEach(employee => {
                const row = document.createElement('tr');

                const nameCell = document.createElement('td');
                nameCell.id = "ID1";
                nameCell.textContent = employee.name;
                row.appendChild(nameCell);

                const imgCell = document.createElement('td');
                const img = document.createElement('img');
                img.src = "./assets/photo.png";
                img.alt = "Employee image";
                imgCell.appendChild(img);
                row.appendChild(imgCell);

                const addressCell = document.createElement('td');
                addressCell.id = "name";
                addressCell.textContent = employee.address;
                row.appendChild(addressCell);

                const phoneCell = document.createElement('td');
                phoneCell.textContent = employee.phone;
                row.appendChild(phoneCell);

                const emailCell = document.createElement('td');
                emailCell.textContent = employee.email;
                row.appendChild(emailCell);

                const positionCell = document.createElement('td');
                positionCell.textContent = employee.PositionEmployee.name_position;
                row.appendChild(positionCell);

                const accountCell = document.createElement('td');
                accountCell.textContent = employee.Account.username;
                row.appendChild(accountCell);

                const kpiCell = document.createElement('td');
                kpiCell.textContent = "80%";
                row.appendChild(kpiCell);

                const actionCell = document.createElement('td');
                actionCell.id = "action";

                const editButton = document.createElement('button');
                editButton.className = 'Edit';
                editButton.textContent = 'Info';
                editButton.addEventListener('click', () => {
                    window.location.href = "employee-info.html?id=" + employee.id;
                })
                actionCell.appendChild(editButton);

                // const deleteButton = document.createElement('button');
                // deleteButton.className = 'Delete';
                // deleteButton.textContent = 'Delete';
                // actionCell.appendChild(deleteButton);

                row.appendChild(actionCell);

                document.querySelector('tbody').appendChild(row);
                sum += 1;
            })
            document.getElementById('Sum').innerText = "Sum: " + sum;
            console.log("Succeeded");
        } catch (error) {
            console.error(error);
        }
    })()
})