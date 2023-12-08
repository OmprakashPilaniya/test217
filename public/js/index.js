console.log("js page is working")
 const citiesByState = {
   "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Tirupati", "Guntur", "Kurnool", "Nellore", "Rajahmundry", "Kakinada", "Kadapa", "Anantapur"],
   "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon", "Tinsukia", "Tezpur", "Karimganj", "Barpeta", "Diphu"],
   "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Katihar", "Chhapra"],
   "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Anand"],
   "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
   "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga"],
   "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
   "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivali", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur"],
   "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Sikar", "Pali"],
   "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Vellore", "Thoothukudi", "Nagercoil", "Thanjavur"],
 };

 function populateCities() {
   const stateSelect = document.getElementById("stateSelect");
   const citySelect = document.getElementById("citySelect");
   const selectedState = stateSelect.value;

   // Clear existing options
   citySelect.innerHTML = '<option value="">Select City</option>';

   if (selectedState && citiesByState[selectedState]) {
     citiesByState[selectedState].forEach(city => {
       const option = document.createElement("option");
       option.value = city;
       option.text = city;
       citySelect.add(option);
     });
   }
 }

