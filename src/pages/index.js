import * as React from "react"
import { useRef, useState, useEffect } from "react"
import Papa from "papaparse"
import { CSVLink } from "react-csv";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = () => {

  const inputRef = useRef()
  const [csvData, setCsvData] = useState("")

  const handleCsvSubmit = (e) => {
    e.preventDefault()
    let csv = inputRef.current.files[0]
    let reader = new FileReader();

    reader.onload = function () {
      let jsonData = Papa.parse(reader.result, { header: "true" }).data
      
      let jsonOutput = jsonData.map((item, i) => {
        return {
          "Handle": item.upc,
          "Title": item.title,
          "Body (HTML)": item.description,
          "Vendor": item.brand,
          "Product Category": "",
          "Type": item.category,
          "Tags": "",
          "Published": "FALSE",
          "Variant Grams": item.weight ? parseFloat(item.weight) * 453.592 : "",
          "Variant Fulfillment Service": "manual",
          "Variant Price": parseFloat(item.wholesale_price) * 2,
          "Variant Compare At Price": parseFloat(item.wholesale_price) * 4,
          "Variant Requires Shipping": "TRUE",
          "Variant Taxable": "TRUE",
          "Image Src": item.image_url,
          "Variant Weight Unit": "g",
          "Status": "draft"
        }
      })
      console.log(jsonOutput);

      setCsvData(jsonOutput)

    }

    reader.readAsText(csv);
  }

  useEffect(() => {
    console.log(csvData)
    console.log(csvData.length)
  })
  

  return (
    <main style={pageStyles}>
      <form onSubmit={handleCsvSubmit}>
        <input ref={inputRef} id="file" name="file" type="file" />
        <button>Upload</button>
      </form>

      <CSVLink data={csvData} filename={"dildoinfoforsellingatblackmarketonlynowhitemarketonlyniggamarket.csv"}>Download me</CSVLink>

    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
