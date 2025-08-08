# Diagramas

### DFD Nível 0

```mermaid
flowchart TD
    A[fa:fa-user Usuário/Motorista] -->|login, solicitações| B[fa:fa-mobile-alt TAKI App]
    B -->|chama API| C[fa:fa-cloud API Gateway]
    C --> D[fa:fa-shield-alt Serviço de Autenticação]
    C --> E[fa:fa-rss Serviço Perfil & Feed]
    C --> F[fa:fa-video Serviço Mídia & Vlogs]
    C --> G[fa:fa-trophy Serviço Gamificação]
    C --> H[fa:fa-comments Serviço Chat & Comunidades]
    C --> I[fa:fa-map-marker-alt Serviço Guia Turístico]
    C --> J[fa:fa-cogs Back-office Admin]

    subgraph Infraestrutura
      D & E & F & G & H & I & J --> K[fa:fa-database Banco de Dados Relacional]
      F --> L[fa:fa-cloud-upload-alt Storage & CDN]
      G & H --> M[fa:fa-bolt NoSQL Cache]
    end

    J -->|CRUD conteúdo| K
```

[![](https://mermaid.ink/img/pako:eNptk71u2zAUhV-F4NDJTm1DlgwNBRwrcZzERZqfDq0zXItXFhGJFEgqaRrnYYoOmTJ26aoX65UsxzFQARfQz_3uOTyknnisBfKQJ5l-iFMwjl1HC8XoGn9PIEygW1o07MaW1S8j9ce5dtpI6-CWdbuf1pleSdVhVmcylg6ql-oP2jU7bNlcL2WGXcho7PhsxsZFcbuZftjgpJgDG1_M1mzSInGmS1G_YlNw-ACPLTCpARa1XTaVmIlm8BWae1m9aCaQjUuHysm4NvJb75FHLWms3SEXaBKZsQ_sGFHstR-37fdSoN4B8-pVSCDgK63c7hHTlnBGF-njDplCLpP_WjrZLlnnOdl-52uSgiORic5LJQUI3JeabeOFgsrcodlPYlqSx-vSVK-WwtgXPX0TXVl2CPFdVydkj7ITuVTUumm25XJloEjZTCUG0DpTutLA5iNjEbk7qnOjmlKdUM2oThuNs1ZDgIMlWCQdFTcbFIHQll1iBrHUCrLb7cDjBjx_fwi6ZZFpaDeZTh2ssM4k-vwGbZRrcN6CS03Nn_XVl3M2gTjFthWV2C6scbieXN5ELNbKYfVX6DU7Wyje4SsjBQ9pqdjhOZoc6kf-VIML7lLMccFDuhWU-YIv1DMxBahvWudbzOhylXKykll6KguKACMJlOWuhdygmehSOR56vWYED5_4Dx4G_QN_EPjD4WjYG3reIOjwRx763sEw8Aae5_X9IPC9wXOH_2w0ewejfm_UD_qjQc_3ekPf63AUksKab37r5u9-_gegyEJQ?type=png)](https://mermaid.live/edit#pako:eNptk71u2zAUhV-F4NDJTm1DlgwNBRwrcZzERZqfDq0zXItXFhGJFEgqaRrnYYoOmTJ26aoX65UsxzFQARfQz_3uOTyknnisBfKQJ5l-iFMwjl1HC8XoGn9PIEygW1o07MaW1S8j9ce5dtpI6-CWdbuf1pleSdVhVmcylg6ql-oP2jU7bNlcL2WGXcho7PhsxsZFcbuZftjgpJgDG1_M1mzSInGmS1G_YlNw-ACPLTCpARa1XTaVmIlm8BWae1m9aCaQjUuHysm4NvJb75FHLWms3SEXaBKZsQ_sGFHstR-37fdSoN4B8-pVSCDgK63c7hHTlnBGF-njDplCLpP_WjrZLlnnOdl-52uSgiORic5LJQUI3JeabeOFgsrcodlPYlqSx-vSVK-WwtgXPX0TXVl2CPFdVydkj7ITuVTUumm25XJloEjZTCUG0DpTutLA5iNjEbk7qnOjmlKdUM2oThuNs1ZDgIMlWCQdFTcbFIHQll1iBrHUCrLb7cDjBjx_fwi6ZZFpaDeZTh2ssM4k-vwGbZRrcN6CS03Nn_XVl3M2gTjFthWV2C6scbieXN5ELNbKYfVX6DU7Wyje4SsjBQ9pqdjhOZoc6kf-VIML7lLMccFDuhWU-YIv1DMxBahvWudbzOhylXKykll6KguKACMJlOWuhdygmehSOR56vWYED5_4Dx4G_QN_EPjD4WjYG3reIOjwRx763sEw8Aae5_X9IPC9wXOH_2w0ewejfm_UD_qjQc_3ekPf63AUksKab37r5u9-_gegyEJQ)

---

### DFD Nível 1 – “Envio e Exibição de Mídia”

```mermaid
flowchart TD
    U[fa:fa-user Usuário] -->|Seleciona foto/vídeo| A[fa:fa-camera App Mídia]
    A -->|POST /upload| G[fa:fa-cloud API Gateway]
    G --> B[fa:fa-file-video Serviço Mídia]
    B -->|Grava meta (JSON)| C[fa:fa-bolt NoSQL Cache]
    B -->|Salva arquivo| D[fa:fa-cloud-upload Storage S3]
    D -->|Notifica conclusão| B
    B -->|Registra entrada no BD| E[fa:fa-database PostgreSQL]
    B -->|Inicia transcodificação| F[fa:fa-sync-alt Serviço Transcoder]
    F -->|Retorna URL transmídia| B
    B -->|Fornece URL CDN| G
    G -->|200 + URL| A
    A -->|Exibe thumbnail| U
```

[![](https://mermaid.ink/img/pako:eNpdksFy2jAQhl9lR9cSYmOwwYfOAA5MOgmhMVxa97CxhdHUlqgsk6SYh-n0kFOfghfr2qSUwQeNd_T9_65-acdilXDms1WmnuM1agOLIJJA3_JrxJZFefilhYrYN7i6-liFPOOxUBJhpYy63h7-JFxVMCR0uNnAPdUCCT46DBvN_CFcwHW5yRQmFUxrdH4LUzT8GV9P7LRmYUS7IddbcXhTl26jxm2qcYuQc4PwKXyYVTAmyUyFn-9gjPGaX-AhZoSj_lGKLQ0a1P5GaUw5hM6JDRp2poxYiRghVjLOyuLwmxSjc7dHnorCaAQuaU0QpIJRUMEN2c5VYVLNaZCLEW6liAUCCWRBYTctDm-N-eT8uIt3gOuTweS9K01MkS8f744ueRPMxWwTYnjMG2ocUDDTs2CrjmXBh3qPLuv8cm5exBMHsy7zJ4kiq2AZSdZiqRYJ840ueYvlXOdYl2xXKyNm1jynnH36TVB_j1gk96TZoPyiVP5PplWZrpm_wqygqtwkdOGBwFTjf4RLOu1YldIw37b6jQfzd-yFSqfTdl2763mdruXZnUG3xV6Z7_batuP1nF7fsdxBz9u32M-mqdX2XNdxe53-wO33bdsinieCkrs_PvDmne__Aim073g?type=png)](https://mermaid.live/edit#pako:eNpdksFy2jAQhl9lR9cSYmOwwYfOAA5MOgmhMVxa97CxhdHUlqgsk6SYh-n0kFOfghfr2qSUwQeNd_T9_65-acdilXDms1WmnuM1agOLIJJA3_JrxJZFefilhYrYN7i6-liFPOOxUBJhpYy63h7-JFxVMCR0uNnAPdUCCT46DBvN_CFcwHW5yRQmFUxrdH4LUzT8GV9P7LRmYUS7IddbcXhTl26jxm2qcYuQc4PwKXyYVTAmyUyFn-9gjPGaX-AhZoSj_lGKLQ0a1P5GaUw5hM6JDRp2poxYiRghVjLOyuLwmxSjc7dHnorCaAQuaU0QpIJRUMEN2c5VYVLNaZCLEW6liAUCCWRBYTctDm-N-eT8uIt3gOuTweS9K01MkS8f744ueRPMxWwTYnjMG2ocUDDTs2CrjmXBh3qPLuv8cm5exBMHsy7zJ4kiq2AZSdZiqRYJ840ueYvlXOdYl2xXKyNm1jynnH36TVB_j1gk96TZoPyiVP5PplWZrpm_wqygqtwkdOGBwFTjf4RLOu1YldIw37b6jQfzd-yFSqfTdl2763mdruXZnUG3xV6Z7_batuP1nF7fsdxBz9u32M-mqdX2XNdxe53-wO33bdsinieCkrs_PvDmne__Aim073g)

---

### DER (Modelo Lógico)

```mermaid
erDiagram
    USUARIO ||--o{ PERFIL : possui
    USUARIO ||--o{ VIAGEM : registra
    USUARIO ||--o{ POST : cria

    PERFIL {
        UUID id
        varchar nome
        varchar foto_perfil
        datetime data_cadastro
    }
    VIAGEM {
        UUID id
        UUID usuario_id
        varchar local
        date data_inicio
        date data_fim
    }
    POST {
        UUID id
        UUID usuario_id
        UUID viagem_id
        text legenda
        datetime data_post
    }
    MIDIA {
        UUID id
        UUID post_id
        varchar tipo
        varchar url_cdn
        varchar thumb_url
    }
    TAKICOIN {
        UUID id
        UUID usuario_id
        integer saldo
    }
    TRANSACAO {
        UUID id
        UUID usuario_id
        integer valor
        varchar tipo
        datetime data
    }
    CHAT {
        UUID id
        varchar nome
        datetime criado_em
    }
    USUARIO_CHAT }o--|| CHAT : participa
    MENSAGEM {
        UUID id
        UUID chat_id
        UUID usuario_id
        text conteudo
        datetime timestamp
    }
    DESTINO {
        UUID id
        varchar nome
        varchar descricao
        float latitude
        float longitude
    }
    EVENTO {
        UUID id
        UUID destino_id
        varchar titulo
        datetime data_evento
    }
```

[![](https://mermaid.ink/img/pako:eNqlVduO2jAQ_ZXIz4AgG255iyBtoxaoIOxDhRS5sQlWEztybLQt8O87uXQhJXQRm4fEnhnPHB-fiQ8oFIQiG1E5ZTiSONlwA571au0svYVxPLbb4mB8d5efvG-GbaQiyzRrjHn2nM_uDGIkjVimJG7OtFj5EBNKBv4yokp-KGfFmrU3NRg5G_ZYhjssDS4Sem3dCiWClMoti89OghVVLKH5AAchJhgwidJ_Kj8V4v8VLgw601gyETQhikWI_6laVmSchUw0ebYsqcEoKHkIROHYw7nRpGZX9EUZMY0oJ_gWI3CSqgZj5k09530c-bpGJhRLxbVVyzgICW8I3-nkZwDuGgjf-epNFt78MT4YV7BpaWQ4JvWj9pfOfOVMnMXHEu9xLOR7W6_xXEMx-eL4D-j8LWHeNUQEtK6fqsOCIvtJtNvHY1kJ2hVLBTJMKxgzF0i4S_KAQgV3UVNoLRRAkCZNJOSvTOEkrWGeuivfmy8-0PSEZkBHiC9qbmOBQfdYMaUJvbILHl04KiDuszv371AFlFOMixvKVzq-JYCA7ilXZzWiFookI8hWUtMWSqhMcD5FBYQNUjsK20U2DAmWvzZow0-wJsX8hxDJ32VS6GiH7C2OM5jpNC9Z_cDfQqD7qZwIzRWyh2aRAtkH9AIzqzPu9qwnazA0LbNnPrXQb2SP-h3TGo-HA8samUNr0D-10J-iZrczGva7F0-vhShhSshZeXsUl8jpFTV_0us?type=png)](https://mermaid.live/edit#pako:eNqlVduO2jAQ_ZXIz4AgG255iyBtoxaoIOxDhRS5sQlWEztybLQt8O87uXQhJXQRm4fEnhnPHB-fiQ8oFIQiG1E5ZTiSONlwA571au0svYVxPLbb4mB8d5efvG-GbaQiyzRrjHn2nM_uDGIkjVimJG7OtFj5EBNKBv4yokp-KGfFmrU3NRg5G_ZYhjssDS4Sem3dCiWClMoti89OghVVLKH5AAchJhgwidJ_Kj8V4v8VLgw601gyETQhikWI_6laVmSchUw0ebYsqcEoKHkIROHYw7nRpGZX9EUZMY0oJ_gWI3CSqgZj5k09530c-bpGJhRLxbVVyzgICW8I3-nkZwDuGgjf-epNFt78MT4YV7BpaWQ4JvWj9pfOfOVMnMXHEu9xLOR7W6_xXEMx-eL4D-j8LWHeNUQEtK6fqsOCIvtJtNvHY1kJ2hVLBTJMKxgzF0i4S_KAQgV3UVNoLRRAkCZNJOSvTOEkrWGeuivfmy8-0PSEZkBHiC9qbmOBQfdYMaUJvbILHl04KiDuszv371AFlFOMixvKVzq-JYCA7ilXZzWiFookI8hWUtMWSqhMcD5FBYQNUjsK20U2DAmWvzZow0-wJsX8hxDJ32VS6GiH7C2OM5jpNC9Z_cDfQqD7qZwIzRWyh2aRAtkH9AIzqzPu9qwnazA0LbNnPrXQb2SP-h3TGo-HA8samUNr0D-10J-iZrczGva7F0-vhShhSshZeXsUl8jpFTV_0us)

---

### DFD Nível 1 - Fluxo de Gamificação (Pontos e Recompensas)
```mermaid
flowchart TD
    U[Usuário] -->|Realiza ação| A[App TAKI]
    A -->|Registra evento| B[API Gateway]
    B --> C[Serviço Gamificação]
    C -->|Valida regras| D[(Redis Cache)]
    C -->|Atualiza pontos| E[(Gamification DB)]
    E -->|Triggers| F[Sistema de Recompensas]
    
    subgraph Recompensas
        F --> G{Verifica nível}
        G -->|Nível 2| H[Desbloqueia "Viajante Social"]
        G -->|Nível 4| I[Ativa "VIP TAKI"]
        F --> J{Acumula TakiCoins}
        J --> K[Oferece recompensas: Café, Playlists, Viagens temáticas]
    end
    
    F -->|Notificação| L[Serviço de Notificações]
    L -->|Push/In-app| U
    C -->|Atualiza ranking| M[(Leaderboard Cache)]
    M --> N[Feed Social]
```

[![](https://mermaid.ink/img/pako:eNp1U01P20AQ_SujvUClQPOFSHyoZBJCA4FGEDjU4TDYE2eLveuu16EQ58egHlAPPfYX5I91YicQpHYPlnfnvZk3b3bnwtcBCUdMIv3gT9FYGHXHCnhde9dptnw2Ut_C3t6n_JIwkk8IuHxZ_tQ5uJ6bJDByz_q3JcFdw0KZWoNAM1KWcUeeO-zDCVp6wMc19GgFhY53RWYmly-aw7GcSL_MvQZ1inw3XDVAMBQaTHPoeruXFMgUOuhP6cM7qGuzUmKiuTKDj73dTWIrtYLu0YZwXBBGRoYhGUb2vCtWTTFCQHBJvo4TUimma3j5TbM7FpFMtwFlZLV6RU8n8xsyRUVQy98zihZviJOi6EVxDPUcPntdSu8i_T0jibBzI_EbKktwpX2J0c7tf5jNHPqea-VsxekPixFsg0shp3PXz-IsQhjhvexoqdItKacF5sz7MiFDPrG9rx05bO1k-asCwwgfI3YlrQBLCzkI7NDy2XJzG2NIBdsO9Uqd2r4NM4fB25jZ3K3gH9qkGRS8YZZOP_bVHiZJDtf_nKxBdS9VmMO5tzsgDMjcaTTB-9twXjR34fWIgrWZHBEVERoZCMeajCoiJhPjaivmK9ZY2CnFNBYO_wZo7sdirBbMSVB91ToWzgSjlHlGZ-H0dZclAV_sLttjMN6kNuwKmY7OlBVOvVrkEM5c_OBdq7nfrtaa1XrroN08qNUPKuKRj9v79Wa73Wq2G7XDRqNRW1TEU1G1ut86ZAxfeavNeflWiye7-AthVzbl?type=png)](https://mermaid.live/edit#pako:eNp1U01P20AQ_SujvUClQPOFSHyoZBJCA4FGEDjU4TDYE2eLveuu16EQ58egHlAPPfYX5I91YicQpHYPlnfnvZk3b3bnwtcBCUdMIv3gT9FYGHXHCnhde9dptnw2Ut_C3t6n_JIwkk8IuHxZ_tQ5uJ6bJDByz_q3JcFdw0KZWoNAM1KWcUeeO-zDCVp6wMc19GgFhY53RWYmly-aw7GcSL_MvQZ1inw3XDVAMBQaTHPoeruXFMgUOuhP6cM7qGuzUmKiuTKDj73dTWIrtYLu0YZwXBBGRoYhGUb2vCtWTTFCQHBJvo4TUimma3j5TbM7FpFMtwFlZLV6RU8n8xsyRUVQy98zihZviJOi6EVxDPUcPntdSu8i_T0jibBzI_EbKktwpX2J0c7tf5jNHPqea-VsxekPixFsg0shp3PXz-IsQhjhvexoqdItKacF5sz7MiFDPrG9rx05bO1k-asCwwgfI3YlrQBLCzkI7NDy2XJzG2NIBdsO9Uqd2r4NM4fB25jZ3K3gH9qkGRS8YZZOP_bVHiZJDtf_nKxBdS9VmMO5tzsgDMjcaTTB-9twXjR34fWIgrWZHBEVERoZCMeajCoiJhPjaivmK9ZY2CnFNBYO_wZo7sdirBbMSVB91ToWzgSjlHlGZ-H0dZclAV_sLttjMN6kNuwKmY7OlBVOvVrkEM5c_OBdq7nfrtaa1XrroN08qNUPKuKRj9v79Wa73Wq2G7XDRqNRW1TEU1G1ut86ZAxfeavNeflWiye7-AthVzbl)

---

## Diagrama Entidade-Relacionamento (DER) Completo
```mermaid
erDiagram
    USUARIO ||--o{ PERFIL : "possui"
    USUARIO ||--o{ VIAGEM : "realiza"
    USUARIO ||--o{ POST : "cria"
    USUARIO ||--o{ TAKICOIN : "acumula"
    USUARIO ||--o{ EVENTO_ESPECIAL : "registra"
    VIAGEM ||--o{ MOMENTO_TAKI : "gera"
    VIAGEM ||--|| DESTINO : "para"
    POST ||--o{ MIDIA : "contém"
    POST ||--o{ HASHTAG : "usa"
    COMUNIDADE ||--o{ GRUPO : "agrupa"
    USUARIO ||--o{ COMUNIDADE : "participa"
    TAKICOIN ||--o{ RECOMPENSA : "resgata"
    MOTORISTA ||--o{ VIAGEM_TEMATICA : "oferece"

    USUARIO {
        string id PK
        string tipo "passageiro/motorista"
        datetime data_cadastro
    }
    
    PERFIL {
        string usuario_id FK
        string foto_url
        string capa_url
        string biografia
        integer nivel "Explorador, VIP, Embaixador"
    }
    
    VIAGEM {
        string id PK
        string usuario_id FK
        string motorista_id FK
        string destino_id FK
        datetime inicio
        datetime fim
        integer avaliacao
    }
    
    MOMENTO_TAKI {
        string viagem_id FK
        string video_url
        string thumbnail_url
        string trilha_sonora
    }
    
    DESTINO {
        string id PK
        string nome
        string tipo "cultural, gastronômico, romântico"
        float latitude
        float longitude
    }
    
    POST {
        string id PK
        string usuario_id FK
        string viagem_id FK
        string legenda
        datetime data_post
    }
    
    MIDIA {
        string id PK
        string post_id FK
        string tipo "foto/vídeo"
        string url_cdn
    }
    
    TAKICOIN {
        string usuario_id FK
        integer saldo
        datetime ultima_atualizacao
    }
    
    RECOMPENSA {
        string id PK
        string nome "Playlist, Corrida Temática, Kit"
        integer custo_pontos
    }
    
    EVENTO_ESPECIAL {
        string id PK
        string usuario_id FK
        string tipo "casamento, formatura"
        datetime data
        string kit_especial "flores, balões"
    }
    
    VIAGEM_TEMATICA {
        string id PK
        string motorista_id FK
        string tema "Romântica, Gastronômica"
        string ambientacao "luzes, playlist"
    }
```

[![](https://mermaid.ink/img/pako:eNqtVs1u2zgQfhWBZzVtXSdOfBNsNRVS_8BWelgEEMYSrRAlRYEijTQ_D9O97WFvu0_gF9vRb-yVlPUC5cWW5hvym5lvhnoioYwoGROqpgxiBeIusXDdrm-dlbewnp_fvZNP1tJdffa-WmPrjqQyywy7I524b55z7c4KnKLA2SP0AJeLtV_AQsX6ML5z400W3rzAQWiE4X1Q95s79xeBu166E8_5WhGIWaZV41Jxqzxmi1nhkh9SwGPaCX1-tqbu2vfmizJ6eEUVMdTbeVPPKQOSid7_IbpAX5z1F9-5LmAma_aZLGa3c2_qTN0aeL26XZbnYUlM2hf1gWPFTbOQvcKbBFb4lYseS3e-dqoEZTHoBj1b-IuVt_ad42IGvjtzfG9S-sgtVTSkuc8xpafyMV-YdJbEFous5U3rrWapLLhmGcSUKfleSC0VVqohkq8INNVM0PwPBCFEgP6ytL-UP1V-S2W2jzeZAcVkgDQ-t2ls8dDAKN4yhJBCp2HDJLbHFtXaWFiiKcrGStiOcgzKfUi5VBBJZWPylrblig2wh_xFHdsR90pmp6bu7YiaNPbYI5pplrS8m0SzBLUjOwxbJtohww67G0LoKslRa7WD2-GcoaKH5Y5FtLsw-t6ITQKMd1sV4_cQZDLBAnRwqnv41FwnUtA-7YaGa6OA21ZcqDLZ_yVYKG1LSbH_PcEelIdS3nIJ2uKgmTYRbb2XSXxgONZ2Pjt-jTreTDrHkiYR9HUfTnzdVeZi5J1KL9-k5_gqrXlLvt_t_0QBHKavDk_xIIySDh7NlDt5BtQizoBHXYrH-jIBAWhTXGHdKj8Ypv9HVBjoksMPjp1qWxOpFIvA8qnY_0TdgG3dMH0YfU01NBkOrBTvFpl1kPn3_fdrRFPrHTIQFE-2cWwqAbn4e2d1a5PvTAc0S2nIIJ-RqHq8d2xrA3z_N83emIuvF8-p0fzXCNRUAFJY1W2K6b4-6GDokB2IDcPQcw2gJzePOfe0KmBDntgkxkKSsVaG2kRQzFL-SArmd0TfUxwnJL9AI1Dfc7_cJ4XkNylF7aakie_JeAs8wyeT5nmtPsoaCPYpVRNpEk3GF-fFFmT8RB7IeDQ8u_rwcfhpeDEaDAcfB59s8oOML8_PBsOrq9HFcHg5GA0vzl9s8lic-eHscoSWg2UTGjHM4Kz8Iiw-DF_-AUQlEjI?type=png)](https://mermaid.live/edit#pako:eNqtVs1u2zgQfhWBZzVtXSdOfBNsNRVS_8BWelgEEMYSrRAlRYEijTQ_D9O97WFvu0_gF9vRb-yVlPUC5cWW5hvym5lvhnoioYwoGROqpgxiBeIusXDdrm-dlbewnp_fvZNP1tJdffa-WmPrjqQyywy7I524b55z7c4KnKLA2SP0AJeLtV_AQsX6ML5z400W3rzAQWiE4X1Q95s79xeBu166E8_5WhGIWaZV41Jxqzxmi1nhkh9SwGPaCX1-tqbu2vfmizJ6eEUVMdTbeVPPKQOSid7_IbpAX5z1F9-5LmAma_aZLGa3c2_qTN0aeL26XZbnYUlM2hf1gWPFTbOQvcKbBFb4lYseS3e-dqoEZTHoBj1b-IuVt_ad42IGvjtzfG9S-sgtVTSkuc8xpafyMV-YdJbEFous5U3rrWapLLhmGcSUKfleSC0VVqohkq8INNVM0PwPBCFEgP6ytL-UP1V-S2W2jzeZAcVkgDQ-t2ls8dDAKN4yhJBCp2HDJLbHFtXaWFiiKcrGStiOcgzKfUi5VBBJZWPylrblig2wh_xFHdsR90pmp6bu7YiaNPbYI5pplrS8m0SzBLUjOwxbJtohww67G0LoKslRa7WD2-GcoaKH5Y5FtLsw-t6ITQKMd1sV4_cQZDLBAnRwqnv41FwnUtA-7YaGa6OA21ZcqDLZ_yVYKG1LSbH_PcEelIdS3nIJ2uKgmTYRbb2XSXxgONZ2Pjt-jTreTDrHkiYR9HUfTnzdVeZi5J1KL9-k5_gqrXlLvt_t_0QBHKavDk_xIIySDh7NlDt5BtQizoBHXYrH-jIBAWhTXGHdKj8Ypv9HVBjoksMPjp1qWxOpFIvA8qnY_0TdgG3dMH0YfU01NBkOrBTvFpl1kPn3_fdrRFPrHTIQFE-2cWwqAbn4e2d1a5PvTAc0S2nIIJ-RqHq8d2xrA3z_N83emIuvF8-p0fzXCNRUAFJY1W2K6b4-6GDokB2IDcPQcw2gJzePOfe0KmBDntgkxkKSsVaG2kRQzFL-SArmd0TfUxwnJL9AI1Dfc7_cJ4XkNylF7aakie_JeAs8wyeT5nmtPsoaCPYpVRNpEk3GF-fFFmT8RB7IeDQ8u_rwcfhpeDEaDAcfB59s8oOML8_PBsOrq9HFcHg5GA0vzl9s8lic-eHscoSWg2UTGjHM4Kz8Iiw-DF_-AUQlEjI)

---

