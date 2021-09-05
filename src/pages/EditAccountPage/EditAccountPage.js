import React from "react";

import SettingsNavigations from "../../components/SettingsNavigations/SettingsNavigations";
import ChangeAccountDataForm from "../../components/ChangeAccountData/ChangeAccountData";
import ChangeAccountPassword from "../../components/ChangeAccountPassword/ChangeAccountPassword";

import "./EditAccountPage.css";

const EditAccountPage = () => {
  return (
    <>
      <SettingsNavigations />
      <div className="settings-wrapper">
        <div>
          <ChangeAccountDataForm />
        </div>
        <div>
          <ChangeAccountPassword />
        </div>
      </div>
    </>
  );
};
export default EditAccountPage;
