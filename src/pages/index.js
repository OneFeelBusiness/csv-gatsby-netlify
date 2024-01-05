import * as React from "react"
import { useRef, useState, useEffect } from "react"
import Papa from "papaparse"
import { CSVLink } from "react-csv";
import JSSoup from 'jssoup';

import parsePage from "../assets/headlineParser";


const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = () => {

  const inputRef = useRef()
  const greenDivRef = useRef()
  const [csvData, setCsvData] = useState("")

  const handleCsvSubmit = (e) => {
    e.preventDefault()
    let csv = inputRef.current.files[0]
    let reader = new FileReader();

    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }

    // usage example:

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
          "Variant Price": parseFloat(item.wholesale_price) * 2,
          "Variant Compare At Price": parseFloat(item.wholesale_price) * 4,
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
          "Cost per item": "",
          "Price / International": "",
          "Compare At Price / International": "",
          "Status": "draft",
        }
      })
      // console.log(jsonOutput);

      // let categories = jsonData.map(item => item.category)

      // var unique = categories.filter(onlyUnique);

      setCsvData(jsonOutput)

    }

    reader.readAsText(csv);
  }



  useEffect(() => {
    let allCategories = ["Bullet Vibrators",
      "Point of Purchase Displays",
      "For Men",
      "Party Wear",
      "Teddies",
      "X Rated Costumes",
      "Bra Sets",
      "Babydolls & Slips",
      "Pasties, Tattoos & Accessories",
      "Lubricants",
      "Condoms",
      "For Women",
      "Womens Underwear",
      "Gag & Joke Gifts",
      "Dresses",
      "Bodystockings, Pantyhose & Garters",
      "Bustiers & Corsets",
      "Sleep & Lounge",
      "Womens Tops & Bottoms",
      "Fetish Clothing",
      "Bras",
      "Sexy Costumes",
      "Lingerie",
      "Sexy Costume Accessories",
      "Party Games",
      "Butt Plugs",
      "Anal Probes",
      "Anal Beads",
      "G-Spot Dildos",
      "Realistic Dildos & Dongs",
      "Extreme Dildos",
      "Huge Dildos",
      "Huge Butt Plugs",
      "Double Penetration",
      "Adjustable & Versatile Cock Rings",
      "Harness & Dong Sets",
      "Strapless Strap-ons",
      "Sexy Wear",
      "Ball Gags",
      "Transgender Wear",
      "Renew Powders",
      "Batteries & Chargers",
      "Luxury Cock Rings",
      "Classic Cock Rings",
      "Toy Cleaners",
      "Lubes & Lotions",
      "Shaving & Intimate Care",
      "Mens Cock & Ball Gear",
      "Rope, Tape & Ties",
      "Crops",
      "Mens Tops & Bottoms",
      "Mens Underwear",
      "Finger Vibrators",
      "Novelties, Party & Fun",
      "Serving Ware",
      "Games for Lovers",
      "Tongues",
      "Clit Suckers & Oral Suction",
      "Penis Pump Accessories",
      "Lifesize Masturbators",
      "Pocket Pussies",
      "Couples Vibrating Cock Rings",
      "Rabbit Style",
      "Lickable Body",
      "Gift Wrapping & Bags",
      "Harnesses",
      "Discreet",
      "Fragrance & Pheromones",
      "Body Massagers",
      "Realistic",
      "Manufacturer Catalogs & Flyers",
      "Penis Sleeves & Enhancers",
      " Catalogs, Sales Tools & Promotional Items",
      "Clit Cuddlers",
      "G Spot Clit Stimulators",
      "Modern Vibrators",
      "Nipple Clamps",
      "Jewelry",
      "G Spot",
      "Electrostimulation",
      "Moisturizers",
      "Sex Instruction",
      "Bondage, Fetish & Kink",
      "Sex Machines",
      "Traditional",
      "Sex Pills",
      "Chastity & Cock Cages",
      "Cleaning Wipes",
      "Shapes, Pillows & Chairs",
      "Bed & Door",
      "Kegel Exercisers",
      "Handcuffs",
      "Masturbation Sleeves",
      "Cock Ring Trios",
      "Anal Douches, Enemas & Hygiene",
      "Medical Play",
      "Adult Books",
      "Body Shapers",
      "Fleshlight ",
      "Anal Masturbators",
      "Adult Candy and Erotic Foods",
      "Hands Free Vibrators",
      "Storage",
      "Vibrating Panties",
      "Luxury",
      "Prostate Massagers",
      "Cock Rings",
      "Dildos",
      "Prostate Toys",
      "Palm Size Massagers",
      "Double Dongs",
      "Penis Extensions",
      "Sexual Enhancers",
      "Sensual Massage Oils & Lotions",
      "Ben Wa Balls",
      "Masturbators",
      "Couples Cock Rings",
      "Blindfolds",
      "Anal Trainer Kits",
      "Gift Sets",
      "Kits & Sleeves",
      "Vibrators",
      "Massagers",
      "Sex Swings & Slings",
      "Collars & Leashes",
      "Bondage Kits",
      "Hoods & Goggles",
      "Hogties",
      "Spreader Bars",
      "Extreme",
      "Porn Star Masturbators",
      "Blow Job Masturbators",
      "Penis Pumps",
      "Hollow Strap-ons",
      "Double Penetration Cock Rings",
      "Female",
      "Liquid Latex",
      "Shoes & Boots",
      "Ankle Cuffs",
      "Wigs",
      "Barnyard Animals",
      "Paddles",
      "Accessories",
      "Sex Swings, Slings & Pillows",
      "Floggers",
      "Whips",
      "Stimulating Cock Rings",
      "Whips, Paddles & Ticklers",
      "Bondage",
      "Feathers & Ticklers",
      "Anal Lubricants",
      "Massage Candles",
      "Pocket Rockets",
      "Nipple Pumps",
      "Slappers & Straps",
      "Restraints",
      "Male",
      "Plus Size Strap-ons",
      "Oral Sex",
      "Cuffs",
      "Stripper Poles",
      "Men's Toys",
      "Celebrity & Porn Star",
      "Ultra Realistic Dolls",
      "Breast Masturbators",
      "Comics",
      "Beauty & Body",
      "Thigh Cuffs",
      "Bath Accessories",
      "Anal Toys",
      "Porn Star Dildos",
      "Bath & Shower",
      "Extreme Bondage",
      "Strap-ons & Harnesses",
      "Clothing",
      "Makeup & Cosmetics",
      "Sex Education & Instruction",
      "Sex Dolls",
      "Transsexual",
      "Anime",
      "Nipple Play",
      "Vac-U-Lock System",
      "Clone Your Own",
      "XR Brands",
      "Games",
      " New Products",
      "Penis Enhancers",
      "Magazines",
      "Men",
      "Erotic Fiction & Erotica",
      "Music & Audio",
      "Extras"]

    let includedCategories = ["Stimulating Cock Rings",
      "Vibrators",
      "Luxury Vibrators",
      "Classic Vibrators",
      "Clitoral Stimulation",
      "Personal Massagers",
      "Rabbit Vibrators",
      "Remote Vibrators",
      "Bullets & Discreet",
      "G Spot Vibrators",
      "Dildos",
      "Porn Star Dildos",
      "Extreme Dildos",
      "Realistic Dildos",
      "Anal Dildos",
      "Strap-on Dildos & Harnesses",
      "G Spot Dildos",
      "Vibrating Dildos",
      "Couples Toys",
      "Cock Rings",
      "Penis Enhancers",
      "Nipple Play",
      "Couples Vibrators",
      "Couples Dildos",
      "Couples Anal Play",
      "Bedroom Accessories",
      "Gift Sets",
      "Anal Toys",
      "Butt Plugs",
      "Prostate Massagers",
      "Double Penetration Dildos",
      "Anal Lube",
      "Anal Trainers",
      "Anal Beads",
      "Anal Douches",
      "Male Masturbators",
      "Porn Star Masturbators",
      "Anal Masturbators",
      "Pocket Pussy",
      "Blow Job Masturbators",
      "Sleeves",
      "Sex Dolls",
      "Penis Pumps",
      "Life Sized Masturbators",
      "Sex Education & Instruction",
      "Bondage & Kink",
      "Gags & Blindfolds",
      "Bondage Kits & Sets",
      "Chastity Cages",
      "Whips & Paddles",
      "Restraints",
      "Medical Play",
      "Extreme Bondage Gear",
      "Nipple Play",
      "Sex Machines",
      "Sex Furniture",
      "Comics",
      "Condoms & More",
      "Condoms",
      "Lubricants",
      "Sex Enhancers",
      "Storage and Toy Care",
      "Sensual Massage",
      "Oral Sex Products",
      "Accessories",
      "Games & Novelty",
      "Personal Care",
      "Clone Your Own",
      "Books",
      "Stripper Poles",
      "Magazines",
      "Lingerie & Clothing",
      "Music & Audio",
      "Women's Lingerie",
      "Sexy Costumes",
      "Sexy Accessories",
      "Fetish Wear",
      "Club Wear",
      "Men's Clothing",
      "Condoms",
      "Lubricants",
      "Shaving & Intimate Care",
      "Toy Cleaners",
      "Lubes & Lotions",
      "Shoes & Boots",
      "Sexy Wear",
      "Lubricants",
      "Feathers & Ticklers",
      "Catalogs, Sales Tools & Promotional Items",
      "Teddies",
      "X Rated Costumes",
      "Pasties, Tattoos & Accessories",
      "Fetish Clothing",
      "Party Wear",
      "Massagers",
      "Hands-Free Vibrators",
      "Bullet Vibrators",
      "Dildos (General)",
      "Porn Star Dildos",
      "Extreme Dildos",
      "Realistic Dildos & Dongs",
      "Anal Dildos",
      "Plus Size Strap-ons",
      "G-Spot Dildos",
      "Couples Vibrating Cock Rings",
      "Double Dongs",
      "Sex Swings & Slings",
      "Gift Sets",
      "Anal Dildos",
      "Butt Plugs",
      "Prostate Massagers",
      "Double Penetration",
      "Anal Lubricants",
      "Anal Beads",
      "Anal Douches, Enemas & Hygiene",
      "Pocket Pussies",
      "Blow Job Masturbators",
      "Masturbation Sleeves",
      "Sex Dolls",
      "Penis Pumps",
      "Lifesize Masturbators",
      "Bondage & Kink",
      "Slappers & Straps",
      "Bondage Kits",
      "Feathers & Ticklers",
      "Restraints",
      "Extreme Bondage",
      "Bed & Door",
      "Lubes & Lotions",
      "Cleaning Wipes",
      "Kits & Sleeves",
      "Erotic Fiction & Erotica",
      "Lubes & Lotions",
      "Sex Instruction",
      "Sexy Wear",
      "Bra Sets",
      "Sexy Costumes",
      "Sexy Costume Accessories",
      "Shoes & Boots",
      "Bustiers & Corsets",
      "Palm-Size Massagers",
      "Finger Vibrators",
      "Huge Dildos",
      "Couples Cock Rings",
      "Anal Trainer Kits",
      "Anal Probes",
      "Fleshlight",
      "Bondage, Fetish & Kink",
      "Whips, Paddles & Ticklers",
      "Slappers & Straps",
      "Extreme",
      "Shapes, Pillows & Chairs",
      "Moisturizers",
      "Renew Powders",
      "Extras",
      "Games",
      "Moisturizers",
      "Adult Books",
      "Lingerie",
      "Babydolls & Slips",
      "Sexy Wear",
      "Accessories",
      "Wigs",
      "Womens Tops & Bottoms",
      "Mens Cock & Ball Gear",
      "Huge Butt Plugs",
      "Fleshlight",
      "Spreader Bars",
      "Extreme Bondage",
      "Cleaning Wipes",
      "Batteries & Chargers",
      "Anime",
      "Cleaning Wipes",
      "Erotic Fiction & Erotica",
      "Clothing",
      "Dresses",
      "Transgender Wear",
      "Bath Accessories",
      "Babydolls & Slips",
      "Sleep & Lounge"]
    let excludedCategories = []

    function checkExcluded() {
      // console.log(includedCategories)

      excludedCategories = allCategories.map(item => {
        if (!includedCategories.includes(item)) return item
        else return
      })

      excludedCategories = excludedCategories.filter(item => item !== undefined)

      // console.log(excludedCategories)
    }

    checkExcluded()


  }, [])

  useEffect(() => {
    fetch("https://wholesale.sextoy.com/collections/luxury-vibrators", {
      method: "GET",
    })
      .then(res => console.log(res.status))
    // console.log("categories", unique)
  }, [])



  useEffect(() => {
    // console.log(csvData.length)
    if (csvData.length > 0) greenDivRef.current.style.display = "block"
    if (!csvData.length || csvData.length <= 0) greenDivRef.current.style.display = "none"
  })


  return (
    <main style={pageStyles}>
      <form onSubmit={handleCsvSubmit}>
        <input ref={inputRef} id="file" name="file" type="file" />
        <button>Upload</button>
      </form>

      <CSVLink data={csvData} filename={"dildoinfoforsellingatblackmarketonlynowhitemarketonlyniggamarket.csv"}>Download me</CSVLink>

      <div ref={greenDivRef} style={{ width: "200px", height: "100px", backgroundColor: "lime", display: "none" }}></div>

    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
