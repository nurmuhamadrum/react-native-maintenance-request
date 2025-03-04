import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function LoadingList() {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item paddingHorizontal={16}>
        <SkeletonPlaceholder.Item marginBottom={12}>
          <SkeletonPlaceholder.Item width={'auto'} height={83} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={12}>
          <SkeletonPlaceholder.Item width={'auto'} height={83} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={12}>
          <SkeletonPlaceholder.Item width={'auto'} height={83} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginBottom={12}>
          <SkeletonPlaceholder.Item width={'auto'} height={83} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
