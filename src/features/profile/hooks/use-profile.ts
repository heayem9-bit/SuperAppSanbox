import { useState, useEffect, useCallback } from 'react';
import { getProfile, upsertProfile } from '../services/db';

export function useProfile() {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [saved, setSaved] = useState(false);

  const loadProfile = useCallback(() => {
    const p = getProfile();
    if (p) {
      setFullname(p.fullname ?? '');
      setPhone(p.phone ?? '');
      setEmail(p.email ?? '');
      setGender(p.gender ?? '');
      setNationality(p.nationality ?? '');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProfile();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadProfile]);

  const save = useCallback(() => {
    upsertProfile(fullname, phone, email, gender, nationality);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [fullname, phone, email, gender, nationality]);

  return {
    fullname,
    setFullname,
    phone,
    setPhone,
    email,
    setEmail,
    gender,
    setGender,
    nationality,
    setNationality,
    save,
    saved,
  };
}
