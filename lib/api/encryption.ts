export const encryptKey = async (key: string) => {
  const response = await fetch('/api/encrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ key }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error occurred');
  }

  const data = await response.json();
  return data.encrypted;
}

export const decryptHash = async (hash: string) => {
  const response = await fetch('/api/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hash }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Unknown error occurred');
  }

  const data = await response.json();
  return data.decrypted;
}
