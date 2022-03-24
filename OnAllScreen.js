function parseColor(input) {
    return input.split("(")[1].split(")")[0].split(",");
}

function positionLink(selector) {
    let rect = selector.getBoundingClientRect();
    let y = rect.y;
    let x = rect.x;
    return {y, x}
}

function positionInList(query, selectorUlHref, urlTarget) {
    let listType = window.getComputedStyle(query).listStyleType
    if (listType !== 'none') {
        if (document.querySelector(selectorUlHref) !== null) {
            let list = document.querySelector(selectorUlHref).parentNode.parentNode
            list = Array.from(list.querySelectorAll('li')).map(element => {
                return element.querySelector('a') === null ? null : element.querySelector('a').getAttribute('href')
            })
            return list.findIndex(item => item === urlTarget) + 1
        }
    }
}

function isOnScreen(selectorHref) {
    let element = selectorHref
    let height = element.getBoundingClientRect().height;
    let width = element.getBoundingClientRect().width;

    if (!width || !height) {
        return false;
    }

    let win = window
    let viewport = {
        top: win.scrollY,
        left: win.scrollX
    };
    viewport.right = viewport.left + win.innerWidth
    viewport.bottom = viewport.top + win.innerHeight

    let bounds = {}
    bounds.right = element.getBoundingClientRect().left + width;
    bounds.bottom = element.getBoundingClientRect().top + height;
    bounds.top = element.getBoundingClientRect().top
    bounds.left = element.getBoundingClientRect().left

    let deltas = {
        top: viewport.bottom - bounds.top,
        left: viewport.right - bounds.left,
        bottom: bounds.bottom - viewport.top,
        right: bounds.right - viewport.left
    }

    return deltas.top > 0
        && deltas.left > 0
        && deltas.right > 0
        && deltas.bottom > 0;
}

function startDetailScreen(urlTarget) {
    let selectorHref = `a[href="${urlTarget}"]`
    let selectorUlHref = `ul a[href="${urlTarget}"]`
    let query = document.querySelector(selectorHref)
    let isScreen = isOnScreen(query)
    let currentUrlShort;
    currentUrlShort = document.URL.length < urlTarget.length;
    let urlFontSize = window.getComputedStyle(query).fontSize
    let color = window.getComputedStyle(query).color
    let backgroundColor = window.getComputedStyle(query).backgroundColor
    let sameColorAndBackgroundColor = JSON.stringify(parseColor(color)) === JSON.stringify(parseColor(backgroundColor))
    let fontWeight = window.getComputedStyle(query).fontWeight
    let fontStyle = window.getComputedStyle(query).fontStyle
    let positionYX = positionLink(query)
    let posInList = positionInList(query, selectorUlHref, urlTarget)
    return {
        urlTarget,
        isScreen,
        currentUrlShort,
        urlFontSize,
        color,
        fontWeight,
        sameColorAndBackgroundColor,
        fontStyle,
        positionYX,
        posInList
    }
}

function resultAll() {
    let links = Array.from(document.querySelectorAll('a')).map(element => {
        return element.getAttribute('href')
    })
    links = links.filter(function (el) {
            return el != null;
        }
    )
    return links.map(link => {
        return startDetailScreen(link)
    })
}