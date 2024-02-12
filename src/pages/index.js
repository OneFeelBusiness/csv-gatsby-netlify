import * as React from "react"
import { useRef, useState, useEffect } from "react"
import Papa from "papaparse"
import { CSVLink } from "react-csv";

import smh from "../assets/smh.json"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = () => {

  const inputRef = useRef()
  const greenDivRef = useRef()
  const [csvData, setCsvData] = useState("")

  function calculateSellPrice(wholesalePrice, category) {
    let priceGroup1 = [
      "Women's Lingerie",
      "Sexy Costumes",
      "Sexy Accessories",
      "Fetish Wear",
      "Club Wear",
      "Men's Clothing",
      "Women's Lingerie",
      "Extreme Bondage Gear",
      "Restraints",
      "Medical Play",
      "Nipple Play",
      "Sex Machines",
      "Sex Furniture"
    ];
    let priceGroup2 = [
      "Condoms",
      "Sex Enhancers",
      "Sexy Accessories",
      "Lubricants",
      "Storage and Toy Care",
      "Sensual Massage",
      "Oral Sex Products",
      "Accessories",
      "Games & Novelty",
      "Personal Care",
      "Clone Your Own",
      "Books",
      "Stripper Poles"
    ];

    if (priceGroup1.includes(category)) {

      if (wholesalePrice > 0 && wholesalePrice <= 9) {
        return wholesalePrice * 3.292
      }

      else if (wholesalePrice > 9 && wholesalePrice <= 22) {
        return wholesalePrice * 2.71
      }

      else if (wholesalePrice > 22 && wholesalePrice <= 35) {
        return wholesalePrice * 2.75
      }

      else if (wholesalePrice > 35 && wholesalePrice <= 50) {
        return wholesalePrice * 2.7
      }

      else if (wholesalePrice > 50 && wholesalePrice <= 80) {
        return wholesalePrice * 2.66
      }

      else if (wholesalePrice > 80) {
        return wholesalePrice * 2.2
      }

      else return wholesalePrice * 2.3

    }
    else if (priceGroup2.includes(category)) {
      return wholesalePrice * 2.3
    }
    else {
      if (wholesalePrice > 0 && wholesalePrice <= 9) {
        return wholesalePrice * 2.1
      }

      else if (wholesalePrice > 9 && wholesalePrice <= 22) {
        return wholesalePrice * 1.89
      }

      else if (wholesalePrice > 22 && wholesalePrice <= 35) {
        return wholesalePrice * 1.87
      }

      else if (wholesalePrice > 35 && wholesalePrice <= 50) {
        return wholesalePrice * 1.87
      }

      else if (wholesalePrice > 50 && wholesalePrice <= 80) {
        return wholesalePrice * 1.87
      }

      else if (wholesalePrice > 80) {
        return wholesalePrice * 1.87
      }

      else return wholesalePrice * 2.3
    }
  }

  const handleCsvSubmit = (e) => {
    e.preventDefault()
    let csv = inputRef.current.files[0]
    let reader = new FileReader();

    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }

    // usage example:

    reader.onload = function () {

      let joinedProductCategoryPairs = []

      for (let i = 0; i < smh.length; i++) {
        let newArr = { h1: smh[i][0].h1, h2s: [] }
        for (let j = 0; j < smh[i].length; j++) {
          newArr.h2s.push(...smh[i][j].h2s)
        }
        joinedProductCategoryPairs.push(newArr)
      }

      function findName(category, name) {
        return category.find((item) => item === name)
      }


      let jsonData = Papa.parse(reader.result, { header: "true" }).data

      let jsonOutput = jsonData.map((item, i) => {
        // console.log(
        //   joinedProductCategoryPairs.find(({ h2s }) => findName(h2s, item.title))
        // )

        let category = joinedProductCategoryPairs.find(({ h2s }) => findName(h2s, item.title)) ? joinedProductCategoryPairs.find(({ h2s }) => findName(h2s, item.title)).h1 : "undefined"
        let sellPrice = calculateSellPrice(parseFloat(item.wholesale_price), category)


        return {
          "Handle": item.upc,
          "Title": item.title ? item.title.replaceAll(`"`, `'`) : item.title,
          "Body (HTML)": item.description ? item.description.replaceAll(`"`, `'`) : item.description,
          "Vendor": item.brand,
          "Product Category": "",
          "Type": category,
          "Tags": item.category,
          "Published": "TRUE",
          "Option1 Name": "",
          "Option1 Value": "",
          "Option2 Name": "",
          "Option2 Value": "",
          "Option3 Name": "",
          "Option3 Value": "",
          "Variant SKU": "",
          "Variant Grams": item.weight ? parseFloat(item.weight) * 453.592 : "",
          "Variant Inventory Tracker": "",
          "Variant Inventory Qty": "",
          "Variant Inventory Policy": "deny",
          "Variant Fulfillment Service": "manual",
          "Variant Price": sellPrice.toFixed(2),
          "Variant Compare At Price": "",
          "Variant Requires Shipping": "TRUE",
          "Variant Taxable": "TRUE",
          "Variant Barcode": "",
          "Image Src": item.image_url,
          "Image Position": "",
          "Image Alt Text": "",
          "Gift Card": "",
          "SEO Title": "",
          "SEO Description": "",
          "Google Shopping / Google Product Category": "",
          "Google Shopping / Gender": "",
          "Google Shopping / Age Group": "",
          "Google Shopping / MPN": "",
          "Google Shopping / AdWords Grouping": "",
          "Google Shopping / AdWords Labels": "",
          "Google Shopping / Condition": "",
          "Google Shopping / Custom Product": "",
          "Google Shopping / Custom Label 0": "",
          "Google Shopping / Custom Label 1": "",
          "Google Shopping / Custom Label 2": "",
          "Google Shopping / Custom Label 3": "",
          "Google Shopping / Custom Label 4": "",
          "Variant Image": "",
          "Variant Weight Unit": "g",
          "Variant Tax Code": "",
          "Cost per item": item.wholesale_price,
          "Price / International": "",
          "Compare At Price / International": "",
          "Status": "active",
        }
      })
      console.log(jsonOutput);
      // console.log(smh);



      // let categories = jsonData.map(item => item.category)

      // var unique = categories.filter(onlyUnique);

      setCsvData(jsonOutput)

    }

    reader.readAsText(csv);
  }

  useEffect(() => {
    // console.log(csvData.length)
    if (csvData.length > 0) greenDivRef.current.style.display = "block"
    if (!csvData.length || csvData.length <= 0) greenDivRef.current.style.display = "none"
  })

  useEffect(() => {
    console.log(csvData)
  })
  

  function renderDownloads() {
    const chunkSize = 5000;
    let chunks = []
    for (let i = 0; i < csvData.length; i += chunkSize) {
        const chunk = csvData.slice(i, i + chunkSize);
        chunks.push(chunk)
    }

    return chunks.map((item, i) => (
      <div>
        <CSVLink key={i} data={item} filename={"dildoinfoforsellingatblackmarketonlynowhitemarketonlyniggamarket_" + i + ".csv"}>Download me {i}</CSVLink>
        <br></br>
      </div>
    ))
  }

  return (
    <main style={pageStyles}>
      <form onSubmit={handleCsvSubmit}>
        <input ref={inputRef} id="file" name="file" type="file" />
        <button>Upload</button>
      </form>

      {renderDownloads()}

      {/* <CSVLink data={csvData} filename={"dildoinfoforsellingatblackmarketonlynowhitemarketonlyniggamarket.csv"}>Download me</CSVLink> */}

      <div ref={greenDivRef} style={{ width: "200px", height: "100px", backgroundColor: "lime", display: "none" }}></div>

    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
