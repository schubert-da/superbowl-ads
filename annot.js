// Annotations for large venns
const type = d3.annotationLabel

const annotations_budweiser = [{
    note: {
        label: "No animal pops up as often as horses do in Budweiser's ads. In fact, of their 24 ads with animals, 21 of them contain horses.",
        title: "Budweiser's horses",
        wrap: 180
    },
    x: 490,
    y: -20,
}]

const makeAnnotationsBudweiser = d3.annotation()
    .notePadding(15)
    .type(type)
    .disable(["connector"])
    .annotations(annotations_budweiser)

const annotations_nfl = [{
    note: {
        label: "What separates the NFL from other brands is that its cast of celebrities consists almost solely of popular names from NFL history.",
        title: "The NFL's stars",
        wrap: 180
    },
    x: 65,
    y: 260,
}]

const makeAnnotationsNFL = d3.annotation()
    .notePadding(15)
    .type(type)
    .disable(["connector"])
    .annotations(annotations_nfl)

const annotations_budlight = [{
    note: {
        label: "After Budweiser, Bud light is in second place for the most number of years named best Super Bowl ad, according to the USA Today Super Bowl Ad Meter.",
        title: "Bud Light's Ad Success",
        wrap: 150
    },
    x: 76,
    y: 60,
}]

const makeAnnotationsBudLight = d3.annotation()
    .notePadding(15)
    .type(type)
    .disable(["connector"])
    .annotations(annotations_budlight)