define({ "api": [
  {
    "type": "get",
    "url": "/message/:id",
    "title": "특정 메시지 (ID)",
    "name": "GetMessageById",
    "group": "Message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Messages unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "message_id",
            "description": "<p>메시지 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>채팅방 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contents",
            "description": "<p>메시지 내용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>송신자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipient",
            "description": "<p>수신자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>생성일</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateAt",
            "description": "<p>수정일</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/message/message.js",
    "groupTitle": "Message"
  },
  {
    "type": "get",
    "url": "/message/rooms/:id\"",
    "title": "특정 채팅방 메시지 (ROOM_ID)",
    "name": "GetMessageByRoomId",
    "group": "Message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Messages Room unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "message_id",
            "description": "<p>메시지 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>채팅방 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contents",
            "description": "<p>메시지 내용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>송신자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipient",
            "description": "<p>수신자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>생성일</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateAt",
            "description": "<p>수정일</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/message/message.js",
    "groupTitle": "Message"
  },
  {
    "type": "get",
    "url": "/message",
    "title": "모든 메시지 정보",
    "name": "GetMessages",
    "group": "Message",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "message_id",
            "description": "<p>메시지 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>채팅방 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "contents",
            "description": "<p>메시지 내용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>송신자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "recipient",
            "description": "<p>수신자</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>생성일</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/message/message.js",
    "groupTitle": "Message"
  },
  {
    "type": "post",
    "url": "/message",
    "title": "메시지 보내기",
    "name": "createMessage",
    "group": "Message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "contents",
            "description": "<p>메시지 내용</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sender",
            "description": "<p>송신자</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "recipient",
            "description": "<p>수신자 (값이 없으면 랜덤으로 지정)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>채팅방 ID (값이 없으면 랜덤으로 지정)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>성별 (남자,여자).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>사용자 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>채팅방 ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_message",
            "description": "<p>메시지 내용.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "profile_image",
            "description": "<p>프로필 이미지</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room_user_name",
            "description": "<p>상대방 이름 ( 삭제 예장 )</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "room_user_list",
            "description": "<p>상대방 정보</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room_user_sex",
            "description": "<p>상대방 성별 ( 삭제 예정 )</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "createdAt",
            "description": "<p>생성일</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updateAt",
            "description": "<p>수정일</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/message/message.js",
    "groupTitle": "Message"
  }
] });
