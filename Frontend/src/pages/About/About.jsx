import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <Box className="bg-red-600 text-white p-10 text-center rounded-lg mb-10">
        <Typography variant="h4" component="h1" gutterBottom>
          About Our Blood Bank
        </Typography>
        <Typography variant="body1">
          Learn why blood donation is necessary, how it affects health,
          eligibility criteria for donating blood, and the purification process.
        </Typography>
      </Box>

      <Card className="mb-10 hover:shadow-xl">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Why Blood Donation is Necessary
          </Typography>
          <Typography variant="body1">
            Blood donation is crucial because it helps save lives. Every few
            seconds, someone needs blood due to surgeries, accidents, cancer
            treatment, and other medical conditions. Your donation can make a
            difference in ensuring that those in need receive the necessary
            blood transfusions.
          </Typography>
        </CardContent>
      </Card>

      <Card className="mb-10">
        {" "}
        <CardContent>
          {" "}
          <Typography variant="h5" component="h2" gutterBottom>
            {" "}
            Who Cannot Donate Blood{" "}
          </Typography>{" "}
          <Typography variant="body1">
            {" "}
            Certain conditions and situations can make someone ineligible to
            donate blood, including:{" "}
            <ul className="list-disc pl-5">
              {" "}
              <li>Having a cold, flu, or other acute infection.</li>{" "}
              <li>
                Being pregnant or having given birth within the last six weeks.
              </li>{" "}
              <li>
                Having certain chronic illnesses like HIV/AIDS or hepatitis.
              </li>{" "}
              <li>
                Engaging in high-risk behaviors such as intravenous drug use.
              </li>{" "}
              <li>
                Recently received a blood transfusion or an organ transplant.
              </li>{" "}
              <li>
                Traveled to certain regions with prevalent infectious diseases.
              </li>{" "}
              <li>Recently had a tattoo or body piercing.</li>{" "}
            </ul>{" "}
            It’s important to consult with medical professionals and follow the
            guidelines set by blood donation organizations to ensure donor and
            recipient safety.{" "}
          </Typography>{" "}
        </CardContent>{" "}
      </Card>

      <Card className="mb-10 hover:shadow-xl">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Health Benefits of Donating Blood
          </Typography>
          <Typography variant="body1">
            Donating blood has several health benefits. It helps reduce the risk
            of heart disease and certain cancers by lowering iron levels in the
            body. It also stimulates the production of new blood cells, which
            can improve overall cardiovascular health.
          </Typography>
        </CardContent>
      </Card>

      <Card className="mb-10 hover:shadow-xl">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            When Can a Person Donate Blood?
          </Typography>
          <Typography variant="body1">
            <strong>Male:</strong> Men can donate blood every 12 weeks.
            <br />
            <strong>Female:</strong> Women can donate blood every 16 weeks.
            <br />
            It’s essential to be in good health and meet the eligibility
            criteria set by health organizations.
          </Typography>
        </CardContent>
      </Card>

      <Card className="mb-10 hover:shadow-xl">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            How Blood is Purified
          </Typography>
          <Typography variant="body1">
            After blood is collected, it undergoes several purification
            processes to ensure safety:
            <ul className="list-disc pl-5">
              <li>
                Testing for infectious diseases such as HIV, hepatitis, and
                syphilis.
              </li>
              <li>
                Separating the blood into components: red cells, plasma, and
                platelets.
              </li>
              <li>Sterilization and storage in controlled conditions.</li>
            </ul>
            These processes ensure that the blood is safe for transfusion to
            patients in need.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
