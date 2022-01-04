import React, { useEffect, useState } from "react";
import { format, formatDuration, intervalToDuration } from "date-fns";
import es from "date-fns/locale/es";
import { Stack, Container, Row, Col, Card, Placeholder } from "react-bootstrap";
import styles from "./styles.module.css";
import Image from "../../../Components/LazyLoadImage";

const DATE_CAMPAIGN = new Date("2022,8,15, 00:00");

const Content = () => {
  const [campaign, setCampaign] = useState({
    date: format(
      DATE_CAMPAIGN,
      "EEEE d 'de' MMMM 'del' y 'a las' k':'mm 'hs'",
      {
        locale: es,
      }
    ),
    description:
      "Quis pariatur enim est dolor id aliqua eiusmod velit sunt quis aliqua dolore irure. Officia adipisicing laborum et sit aute in velit. Aliqua nisi voluptate eu est mollit magna non id. Est magna pariatur in voluptate duis commodo labore Lorem nisi Lorem eiusmod veniam nisi. Aute eiusmod laboris amet excepteur excepteur. Adipisicing anim magna officia mollit dolore voluptate est ullamco aute elit deserunt. Quis laboris aute reprehenderit exercitation minim.Ullamco ipsum mollit irure adipisicing. Laborum laborum esse exercitation ullamco. Adipisicing nisi magna do dolor quis Lorem fugiat.",
    location: "CABA, Buenos Aires, Argentina",
    countdown: null,
  });

  useEffect(() => {
    let clock = setInterval(() => {
      let now = new Date();
      let countdown = intervalToDuration({ start: now, end: DATE_CAMPAIGN });
      let formatTime = formatDuration(countdown, {
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
    <Container fluid className={styles.container}>
      <Row>
        <h1 className="text-center p-3">Acércate a donar los juguetes que ya no uses!</h1>
        <Col xl={8} xxl={6} className="mx-auto p-3">
          <Stack className="text-center" gap={3}>
            <Stack>
              <h4>
                Te esperamos en <strong>{campaign.location}</strong> el día{" "}
                <strong>{campaign.date}.</strong>
              </h4>
            </Stack>
            <Stack className="d-none d-md-flex">
              {!campaign.countdown ? (
                <Placeholder
                  as={Card}
                  body
                  animation="glow"
                  border="secondary"
                  className="bg-transparent"
                >
                  <Placeholder xs={6} />
                </Placeholder>
              ) : (
                <Card body border="secondary" className="bg-transparent">
                  Faltan <strong>{campaign.countdown}</strong> para esta
                  campaña.
                </Card>
              )}
            </Stack>
            <Stack>
              <p className="my-0">{campaign.description}</p>
            </Stack>
            <Stack direction="horizontal" className="d-none d-lg-flex" gap={3}>
              <div style={{ width: "calc(100% / 3)" }}>
                <Image
                  src="/images/campaigns/Foto1.jpg"
                  className={styles.images}
                />
              </div>
              <div style={{ width: "calc(100% / 3)" }}>
                <Image
                  src="/images/campaigns/Foto2.jpg"
                  className={styles.images}
                />
              </div>
              <div style={{ width: "calc(100% / 3)" }}>
                <Image
                  src="/images/campaigns/Foto6.jpg"
                  className={styles.images}
                />
              </div>
            </Stack>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
