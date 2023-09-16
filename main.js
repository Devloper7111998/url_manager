document.addEventListener("DOMContentLoaded", function () {
  var retries = 0;
  const mnage_btn = setInterval(function () {
    console.log("Executing " + retries);
    const btn_even = document.querySelectorAll("button");

    if (btn_even.length != 0) {
      clearInterval(mnage_btn);
      btn_even.forEach((ele) => {
        ele.addEventListener("click", function (elem) {
          document.getElementById("modal_body").innerHTML =
            '<div style="margin-left: 35%;margin-right: auto;margin-top:300px;display:flex;"><div class="spinner-border text-dark d-flex justify-content-center" role="status" ><span class="visually-hidden">Loading...</span></div>&nbsp;&nbsp;&nbsp;<strong role="status">Loading messages please wait...</strong></div>';
          // alert("hi my id is " + elem.target.id);

          var modal = document.getElementById("myModal");

          // Get the button that opens the modal
          var btn = document.getElementById("openModalBtn");

          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];

          // When the user clicks the button, open the modal
          // btn.onclick = function () {
          modal.style.display = "block";

          // };

          ////////////// Main vessel of domination //////////////

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
          myHeaders.append(
            "Cookie",
            "fpc=An_tshpuystIpnNkhnd_ZsvsIX1_AQAAAKQYltwOAAAAlMmSrwEAAADRGJbcDgAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd"
          );

          var urlencoded = new URLSearchParams();
          urlencoded.append("grant_type", "client_credentials");
          urlencoded.append(
            "client_id",
            "8e2c394f-2287-401e-aa0c-92f015249486"
          );
          urlencoded.append(
            "client_secret",
            "Fx-8Q~gszf3jFvhoHgmF~G9mwAKT2nlpPMaNFbRl"
          );
          urlencoded.append("resource", "https://graph.microsoft.com");

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
          };

          fetch("https://tasks.org.in/test/manage_data.php", {
            method: "POST",
            body: JSON.stringify({
              message_url: elem.target.id,
            }),
          })
            .then((response) => response.json())
            .then((res_data) => {
              document.getElementById("modal_body").innerHTML = "<div></div>";
              // console.log(res_data);

              //console.log(typeof adptive_card_content);

              function adaptive_to_html(adpative_content) {
                var adaptiveCard = new AdaptiveCards.AdaptiveCard();

                adaptiveCard.onExecuteAction = function (action) {
                  alert(
                    "Please navigate to teams app using button in teams message column"
                  );
                };

                adaptiveCard.parse(adpative_content);

                var renderedCard = adaptiveCard.render();

                return renderedCard;
              }

              function formatDateToIST(date_utc) {
                const currentDate = new Date(date_utc);
                currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
                currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes

                let year = currentDate.getUTCFullYear();
                let month = String(currentDate.getUTCMonth() + 1).padStart(
                  2,
                  "0"
                );
                let day = String(currentDate.getUTCDate()).padStart(2, "0");
                let hours = String(currentDate.getUTCHours()).padStart(2, "0");
                let minutes = String(currentDate.getUTCMinutes()).padStart(
                  2,
                  "0"
                );
                const seconds = String(currentDate.getUTCSeconds()).padStart(
                  2,
                  "0"
                );

                // Handle the case where adding 30 minutes results in more than 60 minutes
                if (minutes >= 60) {
                  hours = String(parseInt(hours, 10) + 1).padStart(2, "0");
                  minutes = String(parseInt(minutes, 10) - 60).padStart(2, "0");
                }

                // Handle the case where adding 5 hours results in a day change
                if (hours >= 24) {
                  day = String(currentDate.getUTCDate() + 1).padStart(2, "0");
                  hours = String(currentDate.getUTCHours() - 24).padStart(
                    2,
                    "0"
                  );
                }

                const ISTDate = `  ${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                return ISTDate;
              }

              for (var keys in res_data) {
                // console.log(keys);
                if (keys == "main") {
                  var main_data_msg = res_data["main"];

                  if (
                    main_data_msg?.attachments?.[0]?.contentType ==
                    "application/vnd.microsoft.card.adaptive"
                  ) {
                    const adpative_card_content = JSON.parse(
                      main_data_msg?.attachments?.[0].content
                    );
                    const html_main_cont = adaptive_to_html(
                      adpative_card_content
                    );

                    // console.log(html_main_cont);

                    const divWithBorder = document.createElement("div");
                    divWithBorder.style.borderTop = "1px solid #000";

                    document
                      .getElementById("modal_body")
                      .appendChild(divWithBorder);

                    const main_msg_date = document.createTextNode(`
                      Flow ${formatDateToIST(main_data_msg?.createdDateTime)}`);

                    document
                      .getElementById("modal_body")
                      .appendChild(main_msg_date);

                    document
                      .getElementById("modal_body")
                      .appendChild(html_main_cont);

                    document
                      .getElementById("modal_body")
                      .appendChild(divWithBorder);
                  }
                } else {
                  const reply_keys_data = res_data["reply"];

                  function compareDates(a, b) {
                    const dateA = new Date(a.createdDateTime);
                    const dateB = new Date(b.createdDateTime);
                    return dateA - dateB;
                  }

                  reply_keys_data.sort(compareDates);

                  reply_keys_data.map((each_reply) => {
                    ////// Adaptive //////////
                    if (each_reply?.attachments?.length > 0) {
                      if (
                        each_reply?.attachments?.[0]?.contentType ==
                        "application/vnd.microsoft.card.adaptive"
                      ) {
                        const adpative_card_content_rep = JSON.parse(
                          each_reply?.attachments?.[0].content
                        );

                        const html_main_cont_rep = adaptive_to_html(
                          adpative_card_content_rep
                        );

                        document
                          .getElementById("modal_body")
                          .appendChild(html_main_cont_rep);

                        const divWithBorder = document.createElement("div");
                        divWithBorder.style.borderTop = "1px solid #000";

                        document
                          .getElementById("modal_body")
                          .appendChild(divWithBorder);
                      }
                    } else {
                      let reply_msg_cont =
                        `<div><span style="font-weight:bold;" >${
                          each_reply?.from?.application?.displayName !=
                          undefined
                            ? each_reply?.from?.application?.displayName
                            : each_reply?.from?.user?.displayName
                        }</span><span>${formatDateToIST(
                          each_reply?.createdDateTime
                        )}</span></div>` + each_reply.body.content;

                      document.getElementById("modal_body").innerHTML +=
                        reply_msg_cont;

                      const divWithBorder = document.createElement("div");
                      divWithBorder.style.borderTop = "1px solid #000";

                      document
                        .getElementById("modal_body")
                        .appendChild(divWithBorder);
                    }
                  });
                }
              }

              //console.log(renderedCard);
            })
            .catch((error) => {
              console.error("Error:", error);
            });

          //document.getElementById("modal_body").textContent = elem.target.id;

          // When the user clicks on <span> (x), close the modal
          span.onclick = function () {
            modal.style.display = "none";
          };

          // When the user clicks anywhere outside of the modal, close it
          // window.onclick = function (event) {
          //   if (event.target == modal) {
          //     modal.style.display = "none";
          //   }
          // };
        });
      });
    }
    if (retries == 5) {
      console.log("Ok tried 5 times done");
      clearInterval(mnage_btn);
    }
    retries++;
  }, 2000);
});

setInterval(() => {}, 10000);
