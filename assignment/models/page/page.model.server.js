module.exports = function () {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js")();
    var Page = mongoose.model("Page", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deleteWidgetForPage: deleteWidgetForPage
    };
    return api;


    function createPage(page) {
        console.log("Create page in model");
        return Page.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {

        return Page.findById({_id: pageId});
    }

    function updatePage(pageId, page) {

        return Page.update({_id: pageId},
            {
                $set: {
                    _website: page._website,
                    name: page.name,
                    title: page.title,
                    description: page.description,
                    widgets: page.widgets
                }
            });
    }


    function deletePage(pageId) {
      
        return Page.remove({_id: pageId})

    }

    function deleteWidgetForPage(pageId, widgetId){
        return Page.update({_id: pageId},
            {
                $pullAll: {
                    "widgets": [widgetId]
                }
            },
            {safe: true});
    }
}