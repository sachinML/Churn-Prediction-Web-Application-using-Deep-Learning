function getSeniorCitizen() {
  var uiSeniorCitizen = document.getElementsByName("uiSeniorCitizen");
  for(var i in uiSeniorCitizen) {
    if(uiSeniorCitizen[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getPartner() {
  var uiPartner = document.getElementsByName("uiPartner");
  for(var i in uiPartner) {
    if(uiPartner[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getDependents() {
  var uiDependents = document.getElementsByName("uiDependents");
  for(var i in uiDependents) {
    if(uiDependents[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getPhoneService() {
  var uiPhoneService = document.getElementsByName("uiPhoneService");
  for(var i in uiPhoneService) {
    if(uiPhoneService[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getMultipleLines() {
  var uiMultipleLines = document.getElementsByName("uiMultipleLines");
  for(var i in uiMultipleLines) {
    if(uiMultipleLines[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getPaperlessBilling() {
  var uiPaperlessBilling = document.getElementsByName("uiPaperlessBilling");
  for(var i in uiPaperlessBilling) {
    if(uiPaperlessBilling[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getGender() {
  var uiGender = document.getElementsByName("uiGender");
  for(var i in uiGender) {
    if(uiGender[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimateChurn() {
  console.log("Chrn Estimation button clicked");
  var monthlycharges = document.getElementById("uiMonthlyCharges");
  var totalcharges = document.getElementById("uiTotalCharges");
  var tenure = document.getElementById("uiTenure");
  var gender = getGender();
  var seniorcitizen = getSeniorCitizen();
  var partner = getPartner();
  var dependents = getDependents();
  var phoneservice = getPhoneService();
  var multiplelines = getMultipleLines();
  var paperlessbilling = getPaperlessBilling();
  var internetservice = document.getElementById("uiInternetService");
  var contract = document.getElementById("uiContract");
  var paymentmethod = document.getElementById("uiPaymentMethod");
  var estChurn = document.getElementById("uiEstimateChurn");

  var url = "http://127.0.0.1:8080/predict_churn"; 
  
  $.post(url, {
      monthlycharges: parseFloat(monthlycharges.value),
      totalcharges: parseFloat(totalcharges.value),
      tenure: parseInt(tenure.value),
      gender: gender,
      seniorcitizen: seniorcitizen,
      partner: partner,
      dependents: dependents,
      phoneservice: phoneservice,
      multiplelines: multiplelines,
      paperlessbilling: paperlessbilling,
      internetservice: internetservice.value,
      contract: contract.value,
      paymentmethod: paymentmethod.value
  },function(data, status) {
      console.log(data.estimated_churn);
      estChurn.innerHTML = "<h2>" + data.estimated_churn.toString() + "</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:8080/get_features";

  $.get(url, function (data, status) {
      console.log("got response for get_features request");
      if(data) {
          var InternetServices = data.InternetServices;
          var uiInternetServices = document.getElementById("uiInternetService");
          $('#uiInternetService').empty();
          for(var i in InternetServices) {
              var opt1 = new Option(InternetServices[i]);
              $('#uiInternetService').append(opt1);
              }
          var Contracts = data.Contracts;
          var uiContracts = document.getElementById("uiContract");
          $('#uiContract').empty();
          for(var i in Contracts) {
              var opt2 = new Option(Contracts[i]);
              $('#uiContract').append(opt2);
              }
          var PaymentMethods = data.PaymentMethods;
          var uiPaymentMethods = document.getElementById("uiPaymentMethod");
          $('#uiPaymentMethod').empty();
          for(var i in PaymentMethods) {
              var opt3 = new Option(PaymentMethods[i]);
              $('#uiPaymentMethod').append(opt3);
          }
      }
  });
}
window.onload = onPageLoad;
