import * as React from "react"
import { useRef, useState, useEffect } from "react"
import Papa from "papaparse"
import { CSVLink, CSVDownload } from "react-csv";

import productImages from "../assets/sextoywholesale-images.json"
import productInventory from "../assets/sextoywholesale-inventory.json"

// import smh from "../assets/smh2.json"
import smh from "../assets/smh.json"


let sizeArr = [
  "Sm",
  "SM",
  "sm",
  "MD",
  "Md",
  "md",
  "LG",
  "Lg",
  "lg",
  "Xl",
  "Xxl",
  "Xxxl",
  "Xxxxl",
  "XXL",
  "XXXL",
  "XXXXL",
  "1x",
  "2x",
  "3x",
  "4x",
  "1X",
  "2X",
  "3X",
  "4X",
  "O/s",
  "O/S",
  "o/s",
  "OS",
  "Os",
  "os",
  "s/m",
  "S/m",
  "S/M",
  "m/l",
  "M/l",
  "M/L",
  "l/xl",
  "L/xl",
  "L/XL",
  "1X/2X",
  "1X/3X",
  "2X/3X",
  "2X/4X",
  "3X/4X",
  "1x/2x",
  "1x/3x",
  "2x/3x",
  "2x/4x",
  "3x/4x",
  "QN",
  "Qn",
  "qn",
  "Q",
  "q",
]
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
      "Sex Furniture",
      "Gags & Blindfolds",
      "Chastity Cages",
      "Whips & Paddles",
      "Whips & Paddles",

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

  function replaceSize(size) {


    if (size === "SM" || size === "sm" || size === "Sm" || size === "s" || size === "S") return "S"
    else if (size === "MD" || size === "md" || size === "Md" || size === "m" || size === "M") return "M"
    else if (size === "LG" || size === "lg" || size === "Lg" || size === "l" || size === "L") return "L"
    else if (size === "XL" || size === "xl" || size === "Xl") return "XL"
    else if (size === "XXL" || size === "xxl" || size === "Xxl") return "XXL"
    else if (size === "XXXL" || size === "xxxl" || size === "Xxxl") return "XXXL"
    else if (size === "XXXXL" || size === "xxxxl" || size === "Xxxxl") return "XXXXL"
    else if (size === "1x" || size === "1X") return "1X"
    else if (size === "2x" || size === "2X") return "2X"
    else if (size === "3x" || size === "3X") return "3X"
    else if (size === "4x" || size === "4X") return "4X"
    else if (size === "S/M" || size === "S/m" || size === "s/m") return "S/M"
    else if (size === "M/L" || size === "M/l" || size === "m/l") return "M/L"
    else if (size === "L/XL" || size === "L/xl" || size === "l/xl") return "L/XL"
    else if (size === "OS" || size === "os" || size === "Os" || size === "O/s" || size === "O/S" || size === "o/s") return "ONE-SIZE"
    else if (size === "Q" || size === "q" || size === "Qn" || size === "qn" || size === "QN") return "QUEEN"
    else if (size === "1X/2X" || size === "1X/2x" || size === "1x/2x") return "1X/2X"
    else if (size === "2X/3X" || size === "2X/3x" || size === "2x/3x") return "2X/3X"
    else if (size === "3X/4X" || size === "3X/4x" || size === "3x/4x") return "3X/4X"
    else if (size === "1X/3X" || size === "1X/3x" || size === "1x/3x") return "1X/3X"
    else if (size === "2X/4X" || size === "2X/4x" || size === "2x/4x") return "2X/4X"
  }

  const handleCsvSubmit = (e) => {
    e.preventDefault()
    let csv = inputRef.current.files[0]
    let reader = new FileReader();

    // usage example:

    reader.onload = function () {

      function findName(category, name) {
        return category.find((item) => item === name)
      }


      let jsonData = Papa.parse(reader.result, { header: "true" }).data

      let jsonOutput = jsonData.map((item, i) => {
        // console.log(
        //   joinedProductCategoryPairs.find(({ h2s }) => findName(h2s, item.title))
        // )

        let category = smh.find(({ h2s }) => findName(h2s, item.title)) ? smh.find(({ h2s }) => findName(h2s, item.title)).h1 : item.category
        let sellPrice = calculateSellPrice(parseFloat(item.wholesale_price), category).toFixed(2)


        let productArr = []
        productArr.push({
          "Handle": item.upc,
          "Title": item.title ? item.title.replaceAll(`"`, `'`) : item.title,
          "Body (HTML)": item.description ? item.description.replaceAll(`"`, `'`) : item.description,
          "Vendor": item.brand ? item.brand : "Other",
          "Product Category": "",
          "Type": category,
          "Tags": item.category,
          "Published": "TRUE",
          "Option1 Name": "Title",
          "Option1 Value": "Default Title",
          "Option2 Name": "",
          "Option2 Value": "",
          "Option3 Name": "",
          "Option3 Value": "",
          "Variant SKU": "",
          "Variant Grams": item.weight ? parseFloat(item.weight) * 453.592 : "",
          "Variant Inventory Tracker": "shopify",
          "Variant Inventory Qty": productInventory.find(invent => invent.upc === item.upc) ? productInventory.find(invent => invent.upc === item.upc).inventory_quantity : 0,
          "Variant Inventory Policy": "deny",
          "Variant Fulfillment Service": "manual",
          "Variant Price": typeof sellPrice === "string" ? parseFloat(sellPrice) : sellPrice,
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
          "Cost per item": parseFloat(item.wholesale_price),
          "Price / International": typeof sellPrice === "string" ? parseFloat(sellPrice) : sellPrice,
          "Compare At Price / International": "",
          "Status": "active",
        })



        return productArr

      })

      let bigOutput = []
      let newOutput = []
      let tempOutput = []
      let sizeProductArr = []

      jsonOutput.forEach(item => {
        item.forEach(elem => {

          if(!elem.Title) return

          let titleArr
          try {

            titleArr = elem.Title.split(" ")
          }
          catch (e) {
            console.log(elem)
            throw new Error(e)
          }

          if (sizeArr.find(size => size === titleArr[titleArr.length - 1])) tempOutput.push({ ...elem })

          else newOutput.push({ ...elem })

        })
      })

      newOutput.forEach(item => {

        bigOutput.push({ ...item })

        let images = productImages.find((object) => object.upc === item.upc)

        if (images && item.Type !== "undefined") {
          images = [images.image2 ? images.image2 : "", images.image3 ? images.image3 : "", images.image4 ? images.image4 : ""]

          images = images.filter(item => item.length > 0)

          images.forEach(element => {
            bigOutput.push({
              "Handle": item.upc,
              "Title": "",
              "Body (HTML)": "",
              "Vendor": "",
              "Product Category": "",
              "Type": "",
              "Tags": "",
              "Published": "",
              "Option1 Name": "",
              "Option1 Value": "",
              "Option2 Name": "",
              "Option2 Value": "",
              "Option3 Name": "",
              "Option3 Value": "",
              "Variant SKU": "",
              "Variant Grams": "",
              "Variant Inventory Tracker": "",
              "Variant Inventory Qty": "",
              "Variant Inventory Policy": "",
              "Variant Fulfillment Service": "",
              "Variant Price": "",
              "Variant Compare At Price": "",
              "Variant Requires Shipping": "",
              "Variant Taxable": "",
              "Variant Barcode": "",
              "Image Src": element,
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
              "Variant Weight Unit": "",
              "Variant Tax Code": "",
              "Cost per item": "",
              "Price / International": "",
              "Compare At Price / International": "",
              "Status": "",
            })
          });

        }
      })

      ///////////////////////////////////////////////////////////

      // console.log(newOutput)

      tempOutput.forEach(item => {
        item.Title = item.Title.split(` `)
      })

      let actualOutput = []
      actualOutput = [...tempOutput.filter(item => {
        for (let i = 0; i < sizeArr.length; i++) {
          if (item.Title[item.Title.length - 1] === sizeArr[i]) return item
          
        }
      })]

      let x = 1;


      for (let i = 0; i < actualOutput.length; i += x) {
        let nameWithoutSize = actualOutput[i].Title.slice(0, actualOutput[i].Title.length - 1).join(" ")

        let productSizes = actualOutput.filter(item => {

          if (typeof item.Title === "string") item.Title = item.Title.split(" ")

          return item.Title.slice(0, item.Title.length - 1).join(" ") === nameWithoutSize

        })

        x = productSizes.length

        for (let i = 0; i < productSizes.length; i++) {
          let productCopy = { ...productSizes[i] }

          let productCat = productSizes.find(item => item["Type"] !== "undefined")["Type"] || "undefined"

          if (i === 0) {
            productCopy["Option1 Name"] = "Size"
            productCopy["Option1 Value"] = replaceSize(productCopy.Title[productCopy.Title.length - 1])
            productCopy.Title = productCopy.Title.slice(0, productCopy.Title.length - 1).join(" ")
            productCopy.Type = productCat

            bigOutput.push(productCopy)
          }

          else {
            bigOutput.push({
              "Handle": productSizes[0].Handle,
              "Title": "",
              "Body (HTML)": "",
              "Vendor": "",
              "Product Category": "",
              "Type": "",
              "Tags": "",
              "Published": "",
              "Option1 Name": "Size",
              "Option1 Value": replaceSize(productCopy.Title[productCopy.Title.length - 1]),
              "Option2 Name": "",
              "Option2 Value": "",
              "Option3 Name": "",
              "Option3 Value": "",
              "Variant SKU": "",
              "Variant Grams": "",
              "Variant Inventory Tracker": "shopify",
              "Variant Inventory Qty": productCopy["Variant Inventory Qty"],
              "Variant Inventory Policy": "deny",
              "Variant Fulfillment Service": "manual",
              "Variant Price": productCopy["Variant Price"],
              "Variant Compare At Price": "",
              "Variant Requires Shipping": "",
              "Variant Taxable": "",
              "Variant Barcode": "",
              "Image Src": productCopy["Image Src"],
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
              "Variant Weight Unit": "",
              "Variant Tax Code": "",
              "Cost per item": "",
              "Price / International": "",
              "Compare At Price / International": "",
              "Status": "",
            })
          }

          let images = productImages.find((object) => object.upc === productCopy["Handle"])

          if (images && productCopy["Type"] !== "undefined") {
            images = [images.image2 ? images.image2 : "", images.image3 ? images.image3 : "", images.image4 ? images.image4 : ""]

            images = images.filter(item => item.length > 0)

            images.forEach(element => {
              bigOutput.push({
                "Handle": productSizes[0]["Handle"],
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Product Category": "",
                "Type": "",
                "Tags": "",
                "Published": "",
                "Option1 Name": "",
                "Option1 Value": "",
                "Option2 Name": "",
                "Option2 Value": "",
                "Option3 Name": "",
                "Option3 Value": "",
                "Variant SKU": "",
                "Variant Grams": "",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": "",
                "Variant Inventory Policy": "",
                "Variant Fulfillment Service": "",
                "Variant Price": "",
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "",
                "Variant Taxable": "",
                "Variant Barcode": "",
                "Image Src": element,
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
                "Variant Weight Unit": "",
                "Variant Tax Code": "",
                "Cost per item": "",
                "Price / International": "",
                "Compare At Price / International": "",
                "Status": "",
              })
            });

          }

        }

      }

      ///////////////////////////////////////////////////////////


      console.log(bigOutput);
      setCsvData(bigOutput)
      // setCsvData(newOutput)

    }

    reader.readAsText(csv);
  }

  useEffect(() => {
    // console.log(csvData.length)
    if (csvData.length > 0) greenDivRef.current.style.display = "block"
    if (!csvData.length || csvData.length <= 0) greenDivRef.current.style.display = "none"
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
        <CSVLink key={i} data={item} filename={"products_" + i + ".csv"}>Download me {i}</CSVLink>
        {/* <CSVDownload key={i} data={item} filename={"products_" + i + ".csv"} target="_blank">Download me {i}</CSVDownload> */}
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
