<?php
// Database connection
$servername = "localhost";
$username   = "root";      // your MySQL username
$password   = "";          // your MySQL password
$dbname     = "elements"; // your DB name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all elements
$sql = "SELECT AtomicNumber,Element,Symbol,AtomicMass,NumberofNeutrons,NumberofProtons,NumberofElectrons,Periods,Groups,Phase,Category,AtomicRadius,Density,MeltingPoint,BoilingPoint,Discoverer,Years
        FROM elementstable ";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Periodic Table - Full Data</title>
        <link rel="stylesheet" href="navbar.css">
                <link rel="stylesheet" href="overview.css">

    <div class="nav-main">
        <div class="nav-one">
            <img class="nav-one-imgo" src="images/logo.png" alt="logo">
            <img class="nav-one-imgt" src="images/logoname.png" alt="logoname">
        </div>
        <div class="nav-two">
            <a href="homes.html">Home</a>
            <a href="Table.html">Table</a>
            <a href="about.html">About</a>
        </div>
    </div>

</head>
<body>
    <h1>Periodic Table - Detailed Data</h1>
    <table>
        <tr>
            <th>Atomic No.</th>
            <th>Element</th>
            <th>Symbol </th>
            <th>Atomic mass</th>
            <th>Neutrons</th>
            <th>Protons</th>
            <th>Electrons</th>
            <th>Period</th>
            <th>Group</th>
            <th>Phase</th>
            <th>Category</th>
            <th>Atomic Radius</th>
            <th>Density</th>
            <th>Melting Point</th>
            <th>Bioling Point</th>
            <th>Discoverer</th>
            <th>In Year</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>{$row['AtomicNumber']}</td>
                        <td>{$row['Element']}</td>
                        <td>{$row['Symbol']}</td>
                        <td>{$row['AtomicMass']}</td>
                        <td>{$row['NumberofNeutrons']}</td>
                        <td>{$row['NumberofProtons']}</td>
                        <td>{$row['NumberofElectrons']}</td>
                        <td>{$row['Periods']}</td>
                        <td>{$row['Groups']}</td>
                        <td>{$row['Phase']}</td>
                        <td>{$row['Category']}</td>
                        <td>{$row['AtomicRadius']}</td>
                        <td>{$row['Density']}</td>
                        <td>{$row['MeltingPoint']}</td>
                        <td>{$row['BoilingPoint']}</td>
                        <td>{$row['Discoverer']}</td>
                        <td>{$row['Years']}</td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='10'>No data found</td></tr>";
        }
        $conn->close();
        ?>
         <button onclick="window.location.href='table.html'" style="
        background-color: #28a745;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 15px;
    ">
        ⬅ Back
    </button>
    </table>
</body>
</html>
