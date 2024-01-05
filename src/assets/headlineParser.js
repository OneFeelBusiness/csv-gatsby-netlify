import JSSoup from 'jssoup';

function parsePage(url) {
    fetch(url, {
        method: "GET",
    })
    .then(res => res.text())
    .then(data => console.log(data))
}

export default parsePage

// def parse_page(url):
//     response = requests.get(url)
//     html = response.content
//     soup = BeautifulSoup(html, "html.parser")

//     h1 = soup.find("h1")

//     h2s = soup.find_all("h2", class_="productitem--title")

//     return {
//         "h1": h1.text if h1 else None,
//         "h2s": [h2.text for h2 in h2s]
//     }


// urls = ["https://wholesale.sextoy.com/collections/luxury-vibrators", "https://wholesale.sextoy.com/collections/classic-vibrators", "https://wholesale.sextoy.com/collections/clitoral-stimulation"]


// results = []
// for url in urls:
//     results.append(parse_page(url))
