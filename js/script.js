const userData={
  Emails:['a','b','c','d','e','f'],
  Roles:['Admin','Admin','User','User','User','User'],
}

const adData={
  Groups:['Medical','Technology','Finance','Engineering','Marketing','Design'],
  Roles:['Owner','Admin','User','User','User','User'],
  Verification:[`Active`,'Active','Disabled','Disabled','Disabled','Disabled'],
}

const adState=[]

let addiontalButtons = `
  <button class="secondary change-roles added"><span>Change Role</span></button>
  <button class="secondary change-roles added"><span>Remove User</span></button>
`

// adds data to the table and graphs

function tableData(){
  for(let i=0; i<userData.Roles.length; i++){
    $('.prev-bills').append(
      `<tr>
        <td><input class="checkBox" type="checkbox">${userData.Emails[i]}@nutanix.com</td>
        <td>${adData.Roles[i]}<kbd>•</kbd></td>
    </tr>`);
  }

  for(let i=0; i<adData.Roles.length; i++){
    $('.groups').append(
      `<tr>
        <td><input class="checkBox" type="checkbox">${adData.Groups[i]}</td>
        <td>${adData.Roles[i]}</td>
        <td>${adData.Roles[i]}<kbd>•</kbd></td>
    </tr>`);
  }
}

function selectAll(){
  $('#checkBox0, .checkBox').click(function(){
    $("#checkBox0, .checkBox").prop('checked', $(this).prop('checked'));
    if($(".checkBox").prop('checked')){
      $('.actions').append(addiontalButtons);
      $('.reset-mfa').click(function(){popupContent(1)});
    }
    else{$('.added').remove()}
  });
};

//popup
const popupData ={
  title :[
    'Multifactor Authentication',
    'Account Information',
    'Profile Information',
    'Change Password',
    'Setup Active Directory',
    'Active Directory Options',
    'Group Roles'
  ],

  body: [
    //1 step verification
    `
    <div class='dot-parent'>
    </div>
    <h3 style='margin-bottom:5px'>Improve your account security with a 2 step verification process</h3>

    <p>Each time you sign in you'll need your password and a verification code sent directly to a phone.</p>`,

    //2 Reset Multi-factor
    `<p> You are going to reset Multifactor authentication for 6 users are you sure you want to continue</p>`,

    //3

    `<p> You are going to reset Multifactor authentication for 6 users are you sure you want to continue</p>`,

    `<label for="other">Previous Password</label>
    <input type="password" id='old-pswd'>
    <label for="other">New Password</label>
    <input type="password" id='new-pswd'>
    <label for="other">Retype new password</label>
    <input type="password" id='retype'>`,

    `<h3>Enable ADFS by uploading <code>FederationMetadata.xml</code> file.</h3>\
    <input type="file" id='file' accept=".xml">
    <label for='path2'>Select file</label>
    <div class='upload-file'>
    <input class='path' readonly type='text' id='path2'></input>
    <label class='file-button' for='file'>Select File</label>
    </div>
    `,

    `<h3 style='margin-bottom:5px'>Disable Federated Authentication</h3>
    <p>Allows login with you company Active Directory credentials</p>
    <button class="primary">Disable</button>
    <div class='separator'></div>
    <h3 style='margin-bottom:5px'>Remove ADFS</h3>
    <p>Remove AD for this account, this will render all access for the AD users and groups invalid type 'DELETE' to proceed.</p>
    <input type="text" class='confirm-deletion' id='remove'>
    <button class="primary delete">Remove</button>`,

    `
    <h3>Assign <code>Comma-separated</code> groups to their access tiers.</h3>
    <label for="#tags">Administrative access</label>
    <input type="tags" value='administration, IT, marketing' placeholder="Example: group" id='tags'>
    <label for="other">User access</label>
    <input type="text" placeholder="Example: group2" id='users-input'>
    <p id="out"></p>
    `,
  ],

  footer:[
    `<button class="primary save">Enable</button>`,
    `<button class="primary save">Confirm</button>`,
    `<button class="primary save">Save</button>`,
    `<button class="primary save">Save</button>`,
    `<button class="primary upload">Upload</button>`,
    `<button class="secondary save">Done</button>`,
    `<button class="primary back">Assign</button>`
  ]
}

function popAnimate(){
  $('.overlay').addClass('show');
  $('html').css('overflow','hidden');
  setTimeout(function(){
    $('.popup').addClass('appear');
  },200);

  $('.popup-header:not(.popup-header2), .save').click(function(){
      $('.popup').addClass('disappear');
      $('.overlay').addClass('peek');
      $('.overlay').removeClass('show');
      $('html').css('overflow','');
      setTimeout(function(){
        $('.overlay').remove();
      },400);
    }
  );
}

function popupContent(i){
  $('body').append(
    `<div class="overlay" style='opacity:0'>
      <div class="popup" style='opacity:0'>
        <div class="popup-header">${popupData.title[i]}</div>
        <div class="popup-body">${popupData.body[i]}</div>
        <div class="popup-footer">${popupData.footer[i]}</div>
      </div>
    </div>`
  );
  popAnimate();
  $('.upload').click(function(){
    $('.popup').css('animation','layer 600ms forwards');
    $('.popup').addClass('second');
    layer2(6);
  });

}

function layer2(i){
  $('body').append(
    `<div class="overlay overlay2" style='background-color:transparent'>
      <div class="popup layer2" style='opacity:0'>
        <div class="popup-header popup-header2">${popupData.title[i]}</div>
        <div class="popup-body">${popupData.body[i]}</div>
        <div class="popup-footer">${popupData.footer[i]}</div>
      </div>
    </div>`
  );
  popAnimate();
  $('.back, .popup-header2').click(function(){
    $('.layer2').addClass('disappear');
    $('.popup:not(.layer2)').css('animation','reverse-layer 600ms forwards');
    $('.popup:not(.layer2)').removeClass('second');
    $('.layer2, .overlay2').remove();
  });
}


$(document).ready(function() {
  $('.enable-mult-auth').click(function(){popupContent(0)});
  tableData();
  selectAll();
  $('.invite').click(function(){popupContent(0)});
});
