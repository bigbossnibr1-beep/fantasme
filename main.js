/* ------------------------------------------------------ */
    /* ✅ LISTE DES VIDÉOS AVEC CODES UNIQUES                 */
    /* ------------------------------------------------------ */
    const profiles = [
        { name: "PANDA", video: "video/IMG_1051.MP4", thumbnail: "video/IMG_1051.MP4", code: "PANDA-1210" },
        { name: "PANDA", video: "video/IMG_1052.MP4", thumbnail: "video/IMG_1052.MP4", code: "PANDA-1210" },
  
        { name: "TIGRE", video: "video/tigre1.mp4", thumbnail: "video/tigre1.mp4", code: "TIGRE-5501" },
        { name: "TIGRE", video: "video/tigre2.mp4", thumbnail: "video/tigre2.mp4", code: "TIGRE-7784" },
  
        { name: "LOUP", video: "video/loup1.mp4", thumbnail: "video/loup1.mp4", code: "LOUP-9002" }
      ];
  
      let pendingVideo = null;
      let pendingName = null;
      let pendingCode = null;
  
      /* ------------------------------------------------------ */
      /* ✅ CHARGER LES NOMS DANS LE SELECT                     */
      /* ------------------------------------------------------ */
      function loadNameOptions() {
        const select = document.getElementById("nameFilter");
        const names = [...new Set(profiles.map(p => p.name))];
  
        select.innerHTML = `<option value="all">Tous les noms</option>`;
  
        names.forEach(name => {
          const option = document.createElement("option");
          option.value = name;
          option.textContent = name;
          select.appendChild(option);
        });
      }
  
      /* ------------------------------------------------------ */
      /* ✅ AFFICHAGE DES VIDÉOS                                */
      /* ------------------------------------------------------ */
      function displayProfiles(list) {
        const grid = document.getElementById("profilesGrid");
        grid.innerHTML = "";
  
        list.forEach(p => {
          const card = document.createElement("div");
          card.className = "video-card";
  
          card.innerHTML = `
            <video src="${p.thumbnail}" muted preload="metadata"></video>
            <div class="overlay"><span>Débloquer Vidéo</span></div>
          `;
  
          card.querySelector(".overlay").onclick = () => {
            pendingVideo = p.video;
            pendingName = p.name;
            pendingCode = p.code;   /* ✅ CODE UNIQUE */
  
            document.getElementById("secretModal").classList.remove("hidden");
            document.getElementById("secretInput").value = "";
            document.getElementById("secretError").classList.add("hidden");
          };
  
          grid.appendChild(card);
        });
      }
  
      /* ------------------------------------------------------ */
      /* ✅ FILTRAGE PAR NOM                                    */
      /* ------------------------------------------------------ */
      function filterByName() {
        const selected = document.getElementById("nameFilter").value;
  
        if (selected === "all") displayProfiles(profiles);
        else {
          const filtered = profiles.filter(p => p.name === selected);
          displayProfiles(filtered);
        }
      }
  
      /* ------------------------------------------------------ */
      /* ✅ GESTION DU CODE SECRET UNIQUE                        */
      /* ------------------------------------------------------ */
      function closeSecretModal() {
        document.getElementById("secretModal").classList.add("hidden");
      }
  
      function validateCode() {
        const input = document.getElementById("secretInput").value.trim();
  
        if (input !== pendingCode) {
          document.getElementById("secretError").classList.remove("hidden");
          return;
        }
  
        closeSecretModal();
  
        const videoEl = document.getElementById("profileVideo");
        const sourceEl = document.getElementById("videoSource");
  
        document.getElementById("videoTitle").innerText = pendingName;
        sourceEl.src = pendingVideo;
        videoEl.load();
  
        document.getElementById("videoModal").classList.remove("hidden");
        videoEl.play();
      }
  
      function closeVideoModal() {
        const videoEl = document.getElementById("profileVideo");
        videoEl.pause();
        document.getElementById("videoModal").classList.add("hidden");
      }
  
      /* ------------------------------------------------------ */
      /* ✅ INITIALISATION                                       */
      /* ------------------------------------------------------ */
      loadNameOptions();
      displayProfiles(profiles);
