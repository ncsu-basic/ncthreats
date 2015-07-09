
    // var threat_calcs_ssheet = function() {

    //     var qry_str = $.param(form_vals);
    //     $.ajax({
    //         url: SERVER_URI + 'wps/ssheet?' + qry_str,
    //         type: 'GET'
    //     }).done(function(data, textStatus, jqXHR) {
    //         if (jqXHR.status === 201) {
    //             var csvresource = jqXHR.getResponseHeader('Location');
    //             $('#dnlds').attr('action', csvresource);
    //             $('#dnlds').submit();
    //         } else {
    //             console.log("error" + jqXHR.status);
    //         }
    //     });
    // };



    // var open_user_tab = function(firstname, username) {
    //     console.log(username);
    //     console.log(firstname);
    //     var loginmsg = "<p>Hello " + firstname + "</p>";
    //     loginmsg += "<p> You are logged in as " + username + "</p>";
    //     loginmsg += "<p>Open my <a target='_blank' href='" +
    //         SERVER_URI + "wps/user/" + username + "'>page</a>.</p>";
    //     $("#login-msg").html(loginmsg);
    //     Ext.getCmp('userpanel').expand();
    // };

    // var login_form = new Ext.FormPanel({
    //     labelWidth: 80,
    //     // url: SERVER_URI + "wps/login",
    //     frame: true,
    //     title: 'Please Login',
    //     defaultType: 'textfield',
    //     monitorValid: true,
    //     items: [{
    //         fieldLabel: 'Username',
    //         name: 'loginUsername'
    //             // allowBlank: false
    //     }, {
    //         fieldLabel: 'Password',
    //         name: 'loginPassword',
    //         inputType: 'password'
    //             // allowBlank: false
    //     }],
    //     buttons: [{
    //         text: 'Login',
    //         handler: function() {
    //             console.log(login_form.getForm().getValues());
    //             var username = login_form.getForm().getValues().loginUsername;
    //             var passwd = login_form.getForm().getValues().loginPassword;
    //             $.ajax({
    //                 type: "POST",
    //                 url: SERVER_URI + "wps/login",
    //                 data: {
    //                     loginUsername: username,
    //                     loginPassword: passwd
    //                 },
    //                 dataType: "json",
    //                 success: function(data) {
    //                     if (data.success) {
    //                         Ext.Msg.alert('Status',
    //                             'Login Successful!',
    //                             function(btn) {
    //                                 if (btn == 'ok') {}
    //                             });
    //                         open_user_tab(data.firstname, data.username);

    //                     }
    //                 }
    //             });
    //         }
    //     }]
    // });

    // var passwdreset = function() {
    //     var email = passwdresetPanel.getForm().getValues().email;
    //     console.log(email);
    //     $.ajax({
    //         type: "POST",
    //         url: SERVER_URI + "wps/reset",
    //         data: {
    //             email: email
    //         },
    //         dataType: "json",
    //         success: function(data) {
    //             if (data.success) {
    //                 Ext.Msg.alert('Status',
    //                     data.msg,
    //                     function(btn) {
    //                         if (btn == 'ok') {}
    //                     });
    //             }
    //         }
    //     });
    // };

    // var passwdresetPanel = new Ext.FormPanel({
    //     labelWidth: 80, // label settings here cascade unless overridden
    //     frame: true,
    //     title: 'Password reset',
    //     // bodyStyle: 'padding:5px 15px 0',
    //     // width: 296,
    //     defaults: {
    //         width: 200
    //     },
    //     defaultType: 'textfield',

    //     items: [{
    //         fieldLabel: 'email',
    //         name: 'email',
    //         width: 180
    //     }],

    //     buttons: [{
    //         text: 'Submit',
    //         handler: passwdreset
    //     }]
    // });

    // var passwdchng = function() {
    //     console.log('changing passwd');
    //     var newpasswd = passwdchngPanel.getForm().getValues().passwd;
    //     console.log(newpasswd);
    //     $.ajax({
    //         url: SERVER_URI + "wps/passwdchng",
    //         type: "POST",
    //         data: {
    //             'newpasswd': newpasswd
    //         },
    //         dataType: "json",
    //         success: function(data) {
    //             console.log(data);
    //             if (data.success) {
    //                 Ext.Msg.alert('Status',
    //                     'Password changed.',
    //                     function(btn) {
    //                         if (btn == 'ok') {}
    //                     });

    //             }
    //         }
    //     });
    // };

    // var passwdchngPanel = new Ext.FormPanel({
    //     labelWidth: 120, // label settings here cascade unless overridden
    //     frame: true,
    //     title: 'Password change',
    //     // bodyStyle: 'padding:5px 15px 0',
    //     // width: 296,
    //     defaults: {
    //         width: 200
    //     },
    //     defaultType: 'textfield',

    //     items: [{
    //         fieldLabel: 'new password',
    //         name: 'passwd',
    //         width: 150
    //     }],

    //     buttons: [{
    //         text: 'Submit',
    //         handler: passwdchng
    //     }]
    // });


    // var login_html = ["<h2>Registration</h2>",
    //     "<p>If you have not registered please visit the",
    //     "<a href='",
    //     SERVER_URI + 'wps/register',
    //     "' target='_blank'> registration</a> page.</p>"
    // ];

    // var login_panel = new Ext.Panel({
    //     title: 'Login',
    //     items: [login_form, {
    //             xtype: 'container',
    //             autoEl: 'div',
    //             cls: 'mycontent',
    //             html: login_html.join('')
    //         },
    //         passwdresetPanel
    //         // {
    //         //     xtype: 'button',
    //         //     text: 'MyPage'
    //         // }
    //     ],
    //     // cls: 'help',
    //     autoScroll: true
    // });

    // var user_panel = new Ext.Panel({
    //     title: 'User',
    //     id: 'userpanel',
    //     items: [{
    //             xtype: 'spacer',
    //             height: 60,
    //             cls: 'mycontent',
    //             id: 'login-msg'
    //         },
    //         passwdchngPanel
    //     ]
    // });



    // function handleActivate(tab) {
    //     console.log(tab.title + ' was activated.');
    //     $.ajax({
    //         url: SERVER_URI + "wps/loginchk",
    //         data: {},
    //         dataType: "json",
    //         success: function(data) {
    //             if (data.loggedin) {
    //                 console.log(data.username);
    //                 open_user_tab(data.firstname, data.username);
    //             } else {
    //                 console.log('not logged in');
    //             }
    //         }
    //     });
    // }

    // var login_accordion = new Ext.Panel({
    //     title: 'User',
    //     layout: 'accordion',
    //     defaults: {
    //         // applied to each contained panel
    //         //bodyStyle : 'padding:15px'
    //     },
    //     items: [login_panel, user_panel],
    //     listeners: {
    //         activate: handleActivate
    //     }
    // });

    // var print_tab = new Ext.Panel({
    //     title: 'Print',
    //     autoScroll: true,
    //     id: "print_tab_id",
    //     items: [formPanel]
    // });