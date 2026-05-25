(async () => {
  try {
    const res = await fetch("https://firestore.googleapis.com/v1/projects/sonus-site-ae590/databases/(default)/documents/projects");
    const json = await res.json();
    console.log(JSON.stringify(json.documents[0], null, 2));
  } catch(e) {
    console.log(e);
  }
})();
