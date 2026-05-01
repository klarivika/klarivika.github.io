const handle_routes = {
		"#/": {
			page: "home",
			title: " home",
			description: "klarivika home page",
		},
		"/#home": {
			page: "home",
			title: " home",
			description: "klarivika home page",
		},
		"/#faq": {
			page: "faq",
			title: " frequently asked questions",
			description: "klarivika frequently asked questions",
		},
		"/#document/:doc_id/topic/:id/view/:type": {
			page: "document_view",
			title: " document view",
			description: "klarivika document",
		},
		"/#evidence/:id": {
			page: "evidence",
			title: " evidence",
			description: "klarivika evidence",
		},
		"/#404": {
			page: "not-found",
			title: "page not found 404",
			description: "klarivika not found 404 file not found",
		},
	};

export{
    handle_routes
}