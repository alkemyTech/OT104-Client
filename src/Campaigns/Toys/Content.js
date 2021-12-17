import React, { useEffect, useState } from "react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import es from "date-fns/locale/es";
import { Stack } from "react-bootstrap";
import Img from "../../images/Foto5.jpg";

const DATE_CAMPAIGN = new Date("2021,12,25, 15:30");

const Content = () => {
  const [campaign, setCampaign] = useState({
    date: format(
      DATE_CAMPAIGN,
      "EEEE d 'de' MMMM 'del' y 'a las' k':'mm 'hs'",
      {
        locale: es,
      }
    ),
    location: "CABA, Buenos Aires, Argentina",
    countdown: "",
  });

  useEffect(() => {
    let clock = setInterval(() => {
      let now = new Date();
      let countdown = intervalToDuration({ start: now, end: DATE_CAMPAIGN });
      let formatTime = formatDuration(countdown, {
        format: ["days", "hours", "minutes", "seconds"],
        locale: es,
      });
      setCampaign((prev) => {
        return {
          ...prev,
          countdown: formatTime,
        };
      });
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, []);

  return (
    <Stack>
      <Stack>
        <h3>Campaña de juguetes</h3>
        <p>
          Te esperamos en <strong>{campaign.location}</strong> el día{" "}
          <strong>{campaign.date}.</strong>
        </p>
      </Stack>
      <Stack className="d-none d-md-flex">
        <span>Faltan {campaign.countdown} para esta camapaña.</span>
      </Stack>
      <Stack className="d-none d-lg-flex">
        <img src={Img} width={"50%"} />
      </Stack>
    </Stack>
  );
};

export default Content;
