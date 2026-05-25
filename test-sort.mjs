(async () => {
  try {
    const res = await fetch("https://firestore.googleapis.com/v1/projects/sonus-site-ae590/databases/(default)/documents/projects");
    const json = await res.json();
    
    const projects = json.documents.map((doc) => {
      const f = doc.fields;
      return {
        id: parseInt(f.id?.integerValue || f.id?.stringValue || "0"),
        title: f.title?.stringValue || "",
        image: f.image?.stringValue || "",
        order: parseInt(f.order?.integerValue || "0"),
        isHidden: f.isHidden?.booleanValue || false
      };
    });

    const visibleProjects = projects.filter(p => !p.isHidden);
    visibleProjects.sort((a, b) => (a.order || 0) - (b.order || 0));
    
    for (let i = 0; i < 5; i++) {
      console.log(`[${i}] ${visibleProjects[i].title} - ${visibleProjects[i].image}`);
    }
  } catch(e) {
    console.log(e);
  }
})();
