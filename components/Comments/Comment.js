import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import moment from 'moment';

import styles from '../../constants/Comments/Comments';

const Comment = ({
  comment,
  currentUserProfile,
  selectedCampaign,
  deleteComment
}) => {
  const [confirm, setConfirm] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const createdAt = comment.created_at;
  const currentTime = moment();
  const postTime = moment(createdAt);
  let timeDiff;
  if (currentTime.diff(postTime, 'days') < 1) {
    if (currentTime.diff(postTime, 'hours') < 1) {
      if (currentTime.diff(postTime, 'minutes') < 1) {
        timeDiff = 'just now';
      } else {
        if (currentTime.diff(postTime, 'minutes') === 1) {
          timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTE AGO`;
        } else {
          timeDiff = `${currentTime.diff(postTime, 'minutes')} MINUTES AGO`;
        }
      }
    } else {
      if (currentTime.diff(postTime, 'hours') === 1) {
        timeDiff = `${currentTime.diff(postTime, 'hours')} HOUR AGO`;
      } else {
        timeDiff = `${currentTime.diff(postTime, 'hours')} HOURS AGO`;
      }
    }
  } else {
    if (currentTime.diff(postTime, 'days') === 1) {
      timeDiff = `${currentTime.diff(postTime, 'days')} DAY AGO`;
    } else {
      timeDiff = `${currentTime.diff(postTime, 'days')} DAYS AGO`;
    }
  }

  childDelete = id => {
    setDeleted(true);
    setConfirm(false);
    deleteComment(id);
  };

  return (
    <View>
      {deleted === false ? (
        <View style={styles.commentWrapper}>
          <View style={styles.commentView}>
            <View style={styles.avatar}>
              {comment.users_id === selectedCampaign.users_id ? (
                <Avatar
                  rounded
                  containerStyle={{ borderWidth: 1, borderColor: '#00FF9D' }}
                  source={{
                    uri: comment.profile_image
                  }}
                />
              ) : (
                <Avatar
                  rounded
                  source={{
                    uri: comment.profile_image
                  }}
                />
              )}
            </View>
            <View>
              <Text style={styles.username}>{comment.username}</Text>
              <Text style={styles.commentBody}>{comment.comment_body}</Text>
            </View>
          </View>
          <View style={styles.interaction}>
            <Text style={styles.timeText}>{timeDiff}</Text>
            {currentUserProfile.id === comment.users_id ? (
              confirm === false && deleted === false ? (
                <Text
                  style={styles.deleteText}
                  onPress={() => setConfirm(true)}
                >
                  Delete
                </Text>
              ) : null
            ) : null}
            {confirm === true ? (
              <View style={styles.confirmation}>
                <Text style={styles.confirmText}>Are you sure?</Text>
                <Text
                  style={styles.confirmText}
                  onPress={() => childDelete(comment.comment_id)}
                >
                  Yes
                </Text>
                <Text style={styles.confirmText}>/</Text>
                <Text
                  style={styles.confirmNo}
                  onPress={() => setConfirm(false)}
                >
                  No
                </Text>
              </View>
            ) : null}
            {deleted === true ? (
              <View style={styles.confirmation}>
                <Text style={styles.confirmText}>Deleted</Text>
              </View>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default Comment;
