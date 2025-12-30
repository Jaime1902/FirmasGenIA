$(document).ready(function () {

    // --- CONFIGURACIÓN DE ICONOS ---
    const ICONS = {
        phone: "https://cdn-icons-png.flaticon.com/512/724/724664.png",
        web: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
        linkedin: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png",
        twitter: "https://cdn-icons-png.flaticon.com/512/3256/3256013.png",
        instagram: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
        avatar: "https://ui-avatars.com/api/?name=Usuario&background=eff6ff&color=2563eb&size=256"
    };

    // --- ESTADO INICIAL ---
    let state = {
        nombre: 'Ana García',
        cargo: 'Gerente Comercial',
        tel: '+52 555 000 0000',
        web: 'www.miempresa.com',
        linkedin: '',
        twitter: '',
        instagram: '',
        ctaText: '',
        ctaUrl: '',
        color: '#2563eb',
        fontSize: '14px',
        foto: ICONS.avatar,
        currentWorkingImage: null
    };

    let currentTemplateId = 'modern';
    // --- BIBLIOTECA DE PLANTILLAS (CURADA) ---
    const templateLibrary = [
        {
            id: 'modern',
            name: 'Moderna Vertical (Pro)',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: {{fontSize}}; color: #334155;">
        <tr>
            <td style="padding-right: 20px; vertical-align: top;">
                 <img src="{{foto}}" width="100" height="100" style="display: block; border: 0; max-width: 100px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            </td>
            
            <td style="border-left: 2px solid {{color}}; padding-left: 20px; vertical-align: top;">
                <h2 style="margin: 0; color: #0f172a; font-size: 1.4em; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1;">{{nombre}}</h2>
                <p style="margin: 4px 0 15px 0; color: {{color}}; font-size: 0.85em; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">{{cargo}}</p>
                
                <div style="font-size: 0.9em; line-height: 1.8; color: #475569;">
                    <div style="display: flex; align-items: center; margin-bottom: 4px;">
                        <img src="{{icon_phone}}" width="14" height="14" style="display: block; margin-right: 8px; vertical-align: middle;">
                        <span style="font-weight: 500;">{{tel}}</span>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <img src="{{icon_web}}" width="14" height="14" style="display: block; margin-right: 8px; vertical-align: middle;">
                        <span style="font-weight: 500;">{{web}}</span>
                    </div>
                </div>

                <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                    <span style="display: inline-block; vertical-align: middle; margin-right: 15px;">
                        {{social_icons}}
                    </span>
                    <span style="display: inline-block; vertical-align: middle;">
                        {{cta_button}}
                    </span>
                </div>
            </td>
        </tr>
    </table>`
        },
        {
            id: 'classic',
            name: 'Clásica Horizontal (Elegante)',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: {{fontSize}}; color: #444;">
        <tr>
            <td style="padding-bottom: 15px; border-bottom: 2px solid {{color}};">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 20px;">
                            <img src="{{foto}}" width="75" height="75" style="display: block; border-radius: 6px;">
                        </td>
                        <td style="vertical-align: middle;">
                            <strong style="font-size: 1.4em; color: #111; letter-spacing: -0.5px;">{{nombre}}</strong>
                            <div style="color: {{color}}; font-size: 0.9em; font-weight: 600; margin-top: 2px; text-transform: uppercase;">{{cargo}}</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding-top: 12px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td style="vertical-align: middle;">
                            <span style="margin-right: 15px; font-size: 0.9em; color: #666;">
                                <b style="color:{{color}}">T:</b> {{tel}}
                            </span>
                            <span style="margin-right: 15px; font-size: 0.9em; color: #666;">
                                <b style="color:{{color}}">W:</b> {{web}}
                            </span>
                        </td>
                        <td align="right" style="vertical-align: middle;">
                            {{social_icons}}
                        </td>
                    </tr>
                </table>
                <div style="margin-top: 12px;">{{cta_button}}</div>
            </td>
        </tr>
    </table>`
        },
        {
            id: 'sidebar',
            name: 'Barra Lateral (Clean)',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: {{fontSize}}; color: #333;">
        <tr>
            <td width="6" style="background-color: {{color}}; width: 6px; border-radius: 4px;"></td> 
            
            <td style="padding-left: 20px; vertical-align: middle;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="padding-right: 20px; vertical-align: top;">
                            <img src="{{foto}}" width="85" height="85" style="display: block; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        </td>
                        <td style="vertical-align: top;">
                            <h3 style="margin: 0 0 5px 0; color: #111; font-size: 1.4em; font-weight: 700;">{{nombre}}</h3>
                            <p style="margin: 0 0 12px 0; color: {{color}}; font-weight: 600; font-size: 0.9em;">{{cargo}}</p>
                            
                            <div style="font-size: 0.85em; color: #555; margin-bottom: 12px; line-height: 1.5;">
                                <div style="margin-bottom: 4px;">
                                    <img src="{{icon_phone}}" width="12" height="12" style="vertical-align:middle; margin-right: 6px;"> {{tel}}
                                </div>
                                <div>
                                    <img src="{{icon_web}}" width="12" height="12" style="vertical-align:middle; margin-right: 6px;"> {{web}}
                                </div>
                            </div>
                            
                            <div style="display:flex; align-items:center; gap:10px;">{{social_icons}} {{cta_button}}</div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
        },
        {
            id: 'elegant',
            name: 'Elegante Serif',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Georgia, 'Times New Roman', serif; font-size: {{fontSize}}; color: #1a1a1a;">
        <tr>
            <td align="center" style="padding-bottom: 15px;">
                <img src="{{foto}}" width="90" height="90" style="display: block; border-radius: 50%; border: 3px solid #f9f9f9;">
                <h2 style="margin: 15px 0 5px 0; font-size: 1.6em; font-weight: normal; letter-spacing: 0.5px;">{{nombre}}</h2>
                <p style="margin: 0; color: {{color}}; font-style: italic; font-size: 1.05em;">{{cargo}}</p>
            </td>
        </tr>
        <tr>
            <td align="center" style="border-top: 1px solid #eaeaea; padding-top: 15px;">
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 0.85em; letter-spacing: 1px; color: #777; margin-bottom: 15px;">
                    {{tel}} &nbsp;<span style="color:{{color}}">|</span>&nbsp; {{web}}
                </div>
                <div>{{social_icons}}</div>
                <div style="margin-top:15px;">{{cta_button}}</div>
            </td>
        </tr>
    </table>`
        },
        {
            id: 'corporate_block',
            name: 'Corporativa Bloque',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: {{fontSize}}; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
        <tr>
            <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="vertical-align: middle; padding-right: 20px; border-right: 2px solid {{color}};">
                            <img src="{{foto}}" width="80" height="80" style="display: block; border-radius: 4px;">
                        </td>
                        <td style="vertical-align: middle; padding-left: 20px;">
                            <div style="font-weight: 800; font-size: 1.25em; color: #222; text-transform: uppercase; letter-spacing: -0.5px;">{{nombre}}</div>
                            <div style="color: {{color}}; font-weight: 600; margin-bottom: 10px; font-size: 0.9em;">{{cargo}}</div>
                            <div style="font-size: 0.85em; color: #555; line-height: 1.6;">
                                <div style="display:flex; align-items:center;">
                                    <img src="{{icon_phone}}" width="13" height="13" style="margin-right: 8px;"> {{tel}}
                                </div>
                                <div style="display:flex; align-items:center;">
                                    <img src="{{icon_web}}" width="13" height="13" style="margin-right: 8px;"> {{web}}
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 15px; border-top: 1px solid #e9ecef; padding-top: 15px;">
                    <tr>
                        <td align="left">{{social_icons}}</td>
                        <td align="right">{{cta_button}}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
        },
        {
            id: 'topbar',
            name: 'Encabezado Color',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: sans-serif; font-size: {{fontSize}}; color: #333; min-width: 320px;">
        <tr>
            <td style="background-color: {{color}}; height: 8px; font-size: 0; line-height: 0; border-radius: 4px 4px 0 0;">&nbsp;</td>
        </tr>
        <tr>
            <td style="padding: 20px; background-color: #fff; border: 1px solid #eee; border-top: 0; border-radius: 0 0 4px 4px;">
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td style="vertical-align: top; padding-right: 20px;">
                            <img src="{{foto}}" width="70" height="70" style="display: block; border-radius: 50%;">
                        </td>
                        <td>
                            <strong style="display: block; font-size: 1.3em; margin-bottom: 2px;">{{nombre}}</strong>
                            <span style="display: block; color: {{color}}; font-weight: bold; font-size: 0.9em; margin-bottom: 10px; text-transform: uppercase;">{{cargo}}</span>
                            <div style="font-size: 0.85em; color: #555; display: flex; align-items: center;">
                                <img src="{{icon_phone}}" width="12" height="12" style="margin-right: 5px;"> <span style="margin-right: 15px;">{{tel}}</span>
                                <img src="{{icon_web}}" width="12" height="12" style="margin-right: 5px;"> <span>{{web}}</span>
                            </div>
                            <div style="margin-top: 12px; display: flex; align-items: center;">{{social_icons}} <span style="margin-left: 15px;">{{cta_button}}</span></div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
        },
        {
            id: 'minimal',
            name: 'Minimalista',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: {{fontSize}}; color: #111;">
        <tr>
            <td width="65" style="vertical-align: top; padding-right: 15px;">
                <img src="{{foto}}" width="65" height="65" style="display: block; border-radius: 16px;">
            </td>
            <td style="vertical-align: top;">
                <div style="font-weight: 700; font-size: 1.2em; letter-spacing: -0.3px;">{{nombre}}</div>
                <div style="font-size: 0.9em; margin-bottom: 8px; color: #666;">{{cargo}}</div>
                
                <div style="font-size: 0.85em; margin-bottom: 10px; color: #444;">
                    <div>{{tel}}</div>
                    <div>{{web}}</div>
                </div>
                
                <div>{{social_icons}}</div>
            </td>
        </tr>
    </table>`
        },

        // --- ANIMADAS (Mantienen iconos por estilo visual) ---

        {
            id: 'creative_pulse',
            name: '⚡ Tech Pulse (Animada)',
            html: `
    <div style="font-family: 'Segoe UI', Arial, sans-serif;">
        <style>
            @keyframes pulse-ring {
                0% { box-shadow: 0 0 0 0 {{color}}66; }
                70% { box-shadow: 0 0 0 8px {{color}}00; }
                100% { box-shadow: 0 0 0 0 {{color}}00; }
            }
            .avatar-pulse {
                animation: pulse-ring 2s infinite;
                border-radius: 50%;
            }
            @keyframes slide-up {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .text-slide { animation: slide-up 0.8s ease-out forwards; }
        </style>
        <table cellpadding="0" cellspacing="0" border="0" style="font-size: {{fontSize}}; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; min-width: 350px;">
            <tr>
                <td width="6" style="background: {{color}};"></td>
                <td style="padding: 24px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="padding-right: 24px; vertical-align: top;">
                                <div class="avatar-pulse" style="border: 3px solid white;">
                                    <img src="{{foto}}" width="85" height="85" style="display: block; border-radius: 50%;">
                                </div>
                            </td>
                            <td style="vertical-align: middle;">
                                <div class="text-slide">
                                    <h3 style="margin: 0; color: #1e293b; font-size: 1.4em; font-weight: 800;">{{nombre}}</h3>
                                    <div style="color: {{color}}; font-weight: 700; margin: 4px 0 10px 0; font-size: 0.9em;">{{cargo}}</div>
                                    
                                    <div style="color: #64748b; font-size: 0.85em; margin-bottom: 12px; line-height: 1.6;">
                                        <div style="display: flex; align-items: center; margin-bottom: 2px;">
                                            <img src="{{icon_phone}}" width="13" height="13" style="margin-right: 8px;"> {{tel}}
                                        </div>
                                        <div style="display: flex; align-items: center;">
                                            <img src="{{icon_web}}" width="13" height="13" style="margin-right: 8px;"> {{web}}
                                        </div>
                                    </div>
                                    
                                    <div style="opacity: 0.9;">{{social_icons}}</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-top: 15px; border-top: 1px dashed #cbd5e1; margin-top: 10px; text-align: center;">
                                {{cta_button}}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>`
        },
        {
            id: 'creative_gradient',
            name: '🌊 Gradient Flow (Animada)',
            html: `
    <div style="font-family: Helvetica, sans-serif;">
        <style>
            @keyframes gradient-move {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .gradient-bg {
                background: linear-gradient(-45deg, {{color}}, #6366f1, #ec4899, {{color}});
                background-size: 400% 400%;
                animation: gradient-move 8s ease infinite;
            }
        </style>
        <table cellpadding="0" cellspacing="0" border="0" style="font-size: {{fontSize}}; color: #333;">
            <tr>
                <td class="gradient-bg" style="padding: 3px; border-radius: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0" style="background: white; border-radius: 9px; width: 100%;">
                        <tr>
                            <td style="padding: 20px; vertical-align: middle;">
                                <img src="{{foto}}" width="80" height="80" style="display: block; border-radius: 20px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                            </td>
                            <td style="padding: 20px 20px 20px 5px; vertical-align: middle;">
                                <strong style="font-size: 1.3em; display: block; margin-bottom: 4px;">{{nombre}}</strong>
                                <span style="background-color: {{color}}15; color: {{color}}; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; font-weight: bold; letter-spacing: 0.5px;">{{cargo}}</span>
                                
                                <div style="margin-top: 12px; font-size: 0.9em; color: #555; display:flex; align-items:center;">
                                    <div style="margin-right: 12px; display:flex; align-items:center; border-bottom: 1px solid #eee;">
                                        <img src="{{icon_phone}}" width="12" height="12" style="margin-right:6px;"> {{tel}}
                                    </div>
                                    <div style="display:flex; align-items:center; border-bottom: 1px solid #eee;">
                                        <img src="{{icon_web}}" width="12" height="12" style="margin-right:6px;"> {{web}}
                                    </div>
                                </div>
                                
                                <div style="margin-top: 12px; display: flex; align-items: center;">
                                    {{social_icons}}
                                    <span style="margin-left: 15px;">{{cta_button}}</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>`
        },
        {
            id: 'creative_spin',
            name: '🔄 Orbit Loop (Animada)',
            html: `
    <div style="font-family: 'Courier New', Courier, monospace;">
        <style>
            @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .spin-border {
                animation: spin-slow 10s linear infinite;
                transform-origin: center;
            }
        </style>
        <table cellpadding="0" cellspacing="0" border="0" style="font-size: {{fontSize}}; color: #222;">
            <tr>
                <td style="width: 110px; vertical-align: middle;">
                    <div style="position: relative; width: 100px; height: 100px; margin: 0 auto;">
                        <div style="position: absolute; top: 0; left: 0; z-index: 1; width: 100px; height: 100px;">
                            <svg class="spin-border" width="100" height="100" viewBox="0 0 100 100" style="display: block;">
                                <circle cx="50" cy="50" r="48" fill="none" stroke="{{color}}" stroke-width="1.5" stroke-dasharray="10 5" />
                            </svg>
                        </div>
                        <div style="position: absolute; top: 10px; left: 10px; z-index: 2;">
                            <img src="{{foto}}" width="80" height="80" style="display: block; border-radius: 50%; border: 2px solid #fff; object-fit: cover;">
                        </div>
                    </div>
                </td>

                <td style="padding-left: 20px; vertical-align: middle;">
                    <div style="border-bottom: 2px solid {{color}}; padding-bottom: 5px; margin-bottom: 5px; display: inline-block;">
                        <span style="font-weight: 900; font-size: 1.4em; letter-spacing: -1px;">{{nombre}}</span>
                    </div>
                    <div style="font-style: italic; color: #666; margin-bottom: 10px;">// {{cargo}}</div>
                    
                    <table cellpadding="0" cellspacing="0" border="0" style="font-size: 0.9em;">
                        <tr>
                            <td style="padding-right: 15px; border-right: 1px solid #ddd; vertical-align:middle;">
                                <img src="{{icon_phone}}" width="12" height="12" style="vertical-align:middle;"> {{tel}}
                            </td>
                            <td style="padding-left: 15px; vertical-align:middle;">
                                <img src="{{icon_web}}" width="12" height="12" style="vertical-align:middle;"> {{web}}
                            </td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 12px;">
                        {{social_icons}} &nbsp; {{cta_button}}
                    </div>
                </td>
            </tr>
        </table>
    </div>`
        },
        {
            id: 'dev_dark',
            name: '👨‍💻 Developer Dark Mode',
            html: `
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Consolas', 'Courier New', monospace; font-size: {{fontSize}}; background-color: #161b22; color: #c9d1d9; border-radius: 12px; min-width: 400px; overflow: hidden;">
        <tr>
            <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td width="90" style="vertical-align: top; padding-right: 20px;">
                            <div style="border: 2px dashed #2ea043; padding: 4px; border-radius: 50%; display: inline-block; width: 80px; height: 80px; line-height: 0; box-sizing: content-box;">
                                <img src="{{foto}}" width="80" height="80" style="display: block; border-radius: 50%;">
                            </div>
                        </td>
                        <td style="vertical-align: top;">
                            <div style="color: #2ea043; font-weight: bold; font-size: 0.8em; margin-bottom: 5px;">&lt;DEVELOPER_PROFILE /&gt;</div>
                            <h2 style="margin: 0; color: #f0f6fc; font-size: 1.5em; font-weight: 600;">{{nombre}}</h2>
                            <p style="margin: 5px 0 0 0; color: #8b949e; font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px;">{{cargo}}</p>
                        </td>
                    </tr>
                </table>

                <div style="margin-top: 20px; background-color: #0d1117; border-radius: 6px; border-left: 4px solid #2ea043; padding: 15px; font-size: 0.9em; line-height: 1.6; box-shadow: inset 0 0 10px #000000;">
                    <span style="color: #ff7b72;">const</span> <span style="color: #d2a8ff;">contact</span> = {<br>
                    &nbsp;&nbsp;<span style="color: #79c0ff;">phone</span>: <span style="color: #a5d6ff;">"{{tel}}"</span>,<br>
                    &nbsp;&nbsp;<span style="color: #79c0ff;">web</span>: <span style="color: #a5d6ff;">"{{web}}"</span><br>
                    };
                </div>

                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 15px;">
                    <tr>
                        <td style="filter: invert(1) brightness(200%); opacity: 0.7;">
                            {{social_icons}}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
        }
    ];

    // --- GENERADORES AUXILIARES ---
    function generateSocialIcons() {
        let iconsHtml = '';
        const imgStyle = 'width: 20px; height: 20px; display: block; border: 0;';
        const linkStyle = 'text-decoration: none; display: inline-block; margin-right: 8px;';
        const makeLink = (url, iconUrl) => {
            if (!url) return '';
            return `<a href="${url}" target="_blank" style="${linkStyle}"><img src="${iconUrl}" style="${imgStyle}" alt="Social"></a>`;
        };
        iconsHtml += makeLink(state.linkedin, ICONS.linkedin);
        iconsHtml += makeLink(state.twitter, ICONS.twitter);
        iconsHtml += makeLink(state.instagram, ICONS.instagram);
        return iconsHtml;
    }

    function generateCTA() {
        if (!state.ctaText || !state.ctaUrl) return '';
        return `
            <table cellpadding="0" cellspacing="0" border="0" style="display: inline-block;">
                <tr>
                    <td style="background-color: ${state.color}; border-radius: 50px; padding: 6px 16px;">
                        <a href="${state.ctaUrl}" style="color: #ffffff; text-decoration: none; font-weight: bold; font-size: 12px; display: block; font-family: sans-serif;">${state.ctaText}</a>
                    </td>
                </tr>
            </table>`;
    }

    // --- RENDERIZADO PRINCIPAL ---
    function render() {
        const tpl = templateLibrary.find(t => t.id === currentTemplateId) || templateLibrary[0];
        let html = tpl.html;

        html = html.replace(/{{nombre}}/g, state.nombre || 'Tu Nombre');
        html = html.replace(/{{cargo}}/g, state.cargo || 'Cargo');
        html = html.replace(/{{tel}}/g, state.tel);
        html = html.replace(/{{web}}/g, state.web);
        html = html.replace(/{{foto}}/g, state.foto);
        html = html.replace(/{{color}}/g, state.color);
        html = html.replace(/{{fontSize}}/g, state.fontSize);
        html = html.replace(/{{icon_phone}}/g, ICONS.phone);
        html = html.replace(/{{icon_web}}/g, ICONS.web);
        html = html.replace(/{{social_icons}}/g, generateSocialIcons());
        html = html.replace(/{{cta_button}}/g, generateCTA());

        $('#firmaContainer').html(html);
        $('#avatarPreview').attr('src', state.foto);
    }

    // --- INICIALIZACIÓN DE UI ---
    function initUI() {
        const $selector = $('#templateSelector');
        $selector.empty();
        templateLibrary.forEach(tpl => {
            $selector.append(`<option value="${tpl.id}">${tpl.name}</option>`);
        });

        $('#inputNombre').val(state.nombre);
        $('#inputCargo').val(state.cargo);
        $('#inputTel').val(state.tel);
        $('#inputWeb').val(state.web);
        render();
    }

    // --- LISTENERS DE INPUTS ---
    const inputsMap = {
        'inputNombre': 'nombre', 'inputCargo': 'cargo', 'inputTel': 'tel', 'inputWeb': 'web',
        'inputLinkedin': 'linkedin', 'inputTwitter': 'twitter', 'inputInstagram': 'instagram',
        'inputCtaText': 'ctaText', 'inputCtaUrl': 'ctaUrl'
    };

    Object.keys(inputsMap).forEach(id => {
        $('#' + id).on('input', function () {
            state[inputsMap[id]] = $(this).val();
            render();
        });
    });

    $('#inputColor').on('input', function () { state.color = $(this).val(); render(); });
    $('#inputScale').on('change', function () { state.fontSize = $(this).val(); render(); });
    $('#templateSelector').on('change', function () { currentTemplateId = $(this).val(); render(); });

    // --- GESTIÓN DE IMÁGENES Y RECORTE (IA) ---
    let cropper;
    const $imageToCrop = $('#imageToCrop');
    const $cropModal = $('#cropModal');
    const $loader = $('#aiLoader');
    const $imgContainer = $('.img-container');

    function openCropModal(imageSrc) {
        $imageToCrop.attr('src', imageSrc);
        updateModalBackgroundPreview();
        $cropModal.removeClass('hidden').addClass('flex');

        if (cropper) cropper.destroy();
        setTimeout(() => {
            cropper = new Cropper($imageToCrop[0], {
                aspectRatio: 1, viewMode: 1, dragMode: 'move', autoCropArea: 0.8, background: false, responsive: true
            });
        }, 200);
    }

    function updateModalBackgroundPreview() {
        const bgOption = $('input[name="bgOption"]:checked').val();
        const color = $('#bgColorPicker').val();
        $imgContainer.css({ 'background': '', 'background-color': '' });

        if (bgOption === 'transparent') {
            $imgContainer.addClass('bg-[url("https://media.istockphoto.com/id/1146200632/vector/chess-board-background-design.jpg?s=612x612&w=0&k=20&c=L_N4oKz3yP9TfM4N3oKz3yP9TfM4N3oKz3yP9TfM4N0=")]');
        } else if (bgOption === 'color') {
            $imgContainer.css('background-color', color);
        } else if (bgOption === 'gradient') {
            $imgContainer.css('background', `linear-gradient(135deg, #ffffff 0%, ${state.color} 100%)`);
        }
    }

    $('input[name="bgOption"], #bgColorPicker').on('input change', updateModalBackgroundPreview);

    $('#triggerUpload').click(() => $('#inputFoto').click());

    $('#inputFoto').change(function (event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                state.currentWorkingImage = e.target.result;
                openCropModal(state.currentWorkingImage);
            };
            reader.readAsDataURL(file);
        }
        $(this).val('');
    });

    $('#btnRemoveBg').click(async function () {
        if (!window.removeBackgroundAI) return alert("Cargando modelo IA, espera...");
        $loader.removeClass('hidden').addClass('flex');
        try {
            const imageSource = $imageToCrop.attr('src');
            const blob = await window.removeBackgroundAI(imageSource);
            const url = URL.createObjectURL(blob);
            state.currentWorkingImage = url;
            cropper.replace(url);
            $('input[name="bgOption"][value="transparent"]').prop('checked', true);
            updateModalBackgroundPreview();
        } catch (error) {
            console.error(error);
            alert("No pudimos procesar la imagen.");
        } finally {
            $loader.addClass('hidden').removeClass('flex');
        }
    });

    $('#btnConfirmCrop').click(function () {
        if (!cropper) return;
        const canvas = cropper.getCroppedCanvas({ width: 600, height: 600 });
        const bgOption = $('input[name="bgOption"]:checked').val();
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = 600; finalCanvas.height = 600;
        const ctx = finalCanvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(300, 300, 300, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        if (bgOption === 'color') {
            ctx.fillStyle = $('#bgColorPicker').val();
            ctx.fillRect(0, 0, 600, 600);
        } else if (bgOption === 'gradient') {
            const grad = ctx.createLinearGradient(0, 0, 600, 600);
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(1, state.color);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 600, 600);
        }
        ctx.drawImage(canvas, 0, 0, 600, 600);
        state.foto = finalCanvas.toDataURL('image/png');
        render();
        $cropModal.addClass('hidden').removeClass('flex');
    });

    $('#btnCancelCrop').click(() => $cropModal.addClass('hidden').removeClass('flex'));

    // --- FUNCIONALIDAD DE EXPORTACIÓN ---
    $('#btnCopiar').click(function () {
        const node = document.getElementById('firmaContainer');
        const range = document.createRange();
        range.selectNode(node);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
            const $btn = $(this);
            const originalContent = $btn.html();
            $btn.removeClass('bg-slate-900').addClass('bg-emerald-600 border-emerald-500');
            $btn.html(`<i data-lucide="check" class="w-4 h-4"></i> <span>¡Copiada!</span>`);
            lucide.createIcons();
            setTimeout(() => {
                $btn.removeClass('bg-emerald-600 border-emerald-500').addClass('bg-slate-900');
                $btn.html(originalContent);
                lucide.createIcons();
            }, 2500);
        } catch (e) {
            alert('No se pudo copiar automáticamente.');
        }
        window.getSelection().removeAllRanges();
    });

    $('nav button').click(function () {
        const htmlContent = $('#firmaContainer').html();
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Firma de ${state.nombre}</title></head><body>${htmlContent}</body></html>`;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `firma_${state.nombre.replace(/\s+/g, '_').toLowerCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    initUI();
});