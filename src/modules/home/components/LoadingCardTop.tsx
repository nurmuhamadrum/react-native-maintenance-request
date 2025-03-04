import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function LoadingCardTop() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        justifyContent="space-evenly">
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={100} height={100} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={100} height={100} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={100} height={100} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
